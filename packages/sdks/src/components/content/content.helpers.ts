import type { KhulnasoftRenderState } from '../../context/types.js';
import type { KhulnasoftContent } from '../../types/khulnasoft-content.js';
import type { Nullable } from '../../types/typescript.js';
import type { ContentProps } from './content.types.js';

export const getRootStateInitialValue = ({
  content,
  data,
  locale,
}: Pick<ContentProps, 'content' | 'data' | 'locale'>) => {
  const defaultValues: KhulnasoftRenderState = {};

  const initialState = content?.data?.state || {};

  // set default values for content state inputs
  content?.data?.inputs?.forEach((input) => {
    if (input.name && input.defaultValue !== undefined) {
      defaultValues[input.name] = input.defaultValue;
    }
  });

  return {
    ...defaultValues,
    ...initialState,
    ...data,
    ...(locale ? { locale } : {}),
  };
};

export const getContentInitialValue = ({
  content,
  data,
}: Pick<ContentProps, 'content' | 'data'>): Nullable<KhulnasoftContent> => {
  return !content
    ? undefined
    : {
        ...content,
        data: {
          ...content?.data,
          ...data,
        },
        meta: content?.meta,
      };
};
