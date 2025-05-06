import type { QueryObject } from '../../helpers/search/search.js';
import { normalizeSearchParams } from '../../helpers/search/search.js';
import { isBrowser } from '../is-browser.js';

const KHULNASOFT_SEARCHPARAMS_PREFIX = 'khulnasoft.';
const KHULNASOFT_OPTIONS_PREFIX = 'options.';

/**
 * Receives a `URLSearchParams` object or a regular query object, and returns the subset of query params that are
 * relevant to the Khulnasoft SDK.
 *
 * @returns
 */
export const getKhulnasoftSearchParams = (
  _options: QueryObject | URLSearchParams | undefined
) => {
  if (!_options) {
    return {};
  }
  const options = normalizeSearchParams(_options);

  const newOptions: QueryObject = {};
  Object.keys(options).forEach((key) => {
    if (key.startsWith(KHULNASOFT_SEARCHPARAMS_PREFIX)) {
      const trimmedKey = key
        .replace(KHULNASOFT_SEARCHPARAMS_PREFIX, '')
        .replace(KHULNASOFT_OPTIONS_PREFIX, '');
      newOptions[trimmedKey] = options[key];
    }
  });
  return newOptions;
};

export const getKhulnasoftSearchParamsFromWindow = () => {
  if (!isBrowser()) {
    return {};
  }
  const searchParams = new URLSearchParams(window.location.search);
  return getKhulnasoftSearchParams(searchParams);
};
