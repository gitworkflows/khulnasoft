import { TARGET } from '../constants/target.js';
import { checkIsDefined } from '../helpers/nullable.js';
import type {
  KhulnasoftContent,
  KhulnasoftContentVariation,
} from '../types/khulnasoft-content.js';
import type { CanTrack } from '../types/can-track.js';
import type { Nullable, Overwrite } from '../types/typescript.js';
import { getCookie, getCookieSync, setCookie } from './cookie.js';
import { logger } from './logger.js';

const KHULNASOFT_STORE_PREFIX = 'khulnasoft.tests';

const getContentTestKey = (id: string) => `${KHULNASOFT_STORE_PREFIX}.${id}`;

const getContentVariationCookie = ({ contentId }: { contentId: string }) =>
  getCookie({ name: getContentTestKey(contentId), canTrack: true });

const getContentVariationCookieSync = ({ contentId }: { contentId: string }) =>
  getCookieSync({ name: getContentTestKey(contentId), canTrack: true });

const setContentVariationCookie = ({
  contentId,
  value,
}: {
  contentId: string;
  value: string;
}) => setCookie({ name: getContentTestKey(contentId), value, canTrack: true });

type KhulnasoftContentWithVariations = Overwrite<
  KhulnasoftContent,
  Required<Pick<KhulnasoftContent, 'variations' | 'id'>>
>;

const checkIsKhulnasoftContentWithVariations = (
  item: KhulnasoftContent
): item is KhulnasoftContentWithVariations =>
  checkIsDefined(item.id) &&
  checkIsDefined(item.variations) &&
  Object.keys(item.variations).length > 0;

/**
 * Randomly assign a variation to a user
 */
const getRandomVariationId = ({
  id,
  variations,
}: KhulnasoftContentWithVariations) => {
  let n = 0;
  const random = Math.random();

  // loop over variations test ratios, incrementing a counter,
  // until we find the variation that this user should be assigned to
  for (const id in variations) {
    const testRatio = variations[id]?.testRatio;
    n += testRatio!;

    if (random < n) {
      return id;
    }
  }

  // the variations array does not include the default variation.
  // if we arrive here, then it means that the random number fits in the default variation bucket.
  return id;
};

const getAndSetVariantId = (args: KhulnasoftContentWithVariations) => {
  // if variation not found in storage, assign a random variation to this user
  const randomVariationId = getRandomVariationId(args);

  // store variation in cookies/storage
  setContentVariationCookie({
    contentId: args.id,
    value: randomVariationId,
  }).catch((err) => {
    logger.error('could not store A/B test variation: ', err);
  });

  return randomVariationId;
};

type TestFields = {
  data?: KhulnasoftContentVariation['data'];
  testVariationId?: string;
  testVariationName: string;
};

const getTestFields = ({
  item,
  testGroupId,
}: {
  item: KhulnasoftContentWithVariations;
  testGroupId: string;
}): TestFields => {
  const variationValue = item.variations[testGroupId];
  if (
    testGroupId === item.id ||
    // handle edge-case where `testGroupId` points to non-existing variation
    !variationValue
  ) {
    return {
      testVariationId: item.id,
      testVariationName: 'Default',
    };
  } else {
    return {
      data: variationValue.data,
      testVariationId: variationValue.id,
      testVariationName:
        variationValue.name || (variationValue.id === item.id ? 'Default' : ''),
    };
  }
};

export const handleABTestingSync = ({
  item,
  canTrack,
}: { item: Nullable<KhulnasoftContent> } & CanTrack): Nullable<KhulnasoftContent> => {
  /**
   * We cannot SSR in React-Native.
   */
  if (TARGET === 'reactNative') return item;

  if (!canTrack) {
    return item;
  }

  if (!item) {
    return undefined;
  }

  if (!checkIsKhulnasoftContentWithVariations(item)) {
    return item;
  }

  const testGroupId =
    getContentVariationCookieSync({
      contentId: item.id,
    }) ||
    getAndSetVariantId({
      variations: item.variations,
      id: item.id,
    });

  const variationValue = getTestFields({ item, testGroupId });
  return {
    ...item,
    ...variationValue,
  };
};

export const handleABTesting = async ({
  item,
  canTrack,
}: { item: KhulnasoftContent } & CanTrack): Promise<KhulnasoftContent> => {
  if (!canTrack) {
    return item;
  }

  if (!checkIsKhulnasoftContentWithVariations(item)) {
    return item;
  }

  const cookieValue = await getContentVariationCookie({
    contentId: item.id,
  });

  const testGroupId =
    cookieValue ||
    getAndSetVariantId({
      variations: item.variations,
      id: item.id,
    });

  const variationValue = getTestFields({ item, testGroupId });
  return {
    ...item,
    ...variationValue,
  };
};
