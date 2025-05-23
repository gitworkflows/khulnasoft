import type { ContentVariantsPrps } from '../components/content-variants/content-variants.types.js';
import type { Dictionary } from '../types/typescript.js';
import { getKhulnasoftSearchParams } from './get-khulnasoft-search-params/index.js';
import { fetchOneEntry } from './get-content/index.js';
import type { GetContentOptions } from './get-content/types.js';

type GetKhulnasoftPropsOptions = (Omit<GetContentOptions, 'model'> & {
  model?: string;
}) &
  (
    | {
        /**
         * The current URL path. Used to determine the `urlPath` for targeting content.
         *
         * Cannot be used with `url`.
         */
        path: string;

        /**
         * The current URL search params. Used to parse the `searchParams` for targeting content.
         *
         * Cannot be used with `url`.
         */
        searchParams?: URLSearchParams | Dictionary<string | string[]>;
        url?: undefined;
      }
    | {
        /**
         * The current URL. Used to determine the `urlPath` for targeting content and
         * to parse the `searchParams` for targeting content.
         *
         * Cannot be used with `path` or `searchParams`.
         */
        url: URL;
        path?: undefined;
        searchParams?: undefined;
      }
    | {
        url?: undefined;
        path?: undefined;
        searchParams?: undefined;
      }
  );

/**
 * Given an `apiKey` and `url` (or `path` + `searchParams`), provides all props that `Content` needs to render Khulnasoft Content.
 *
 * @example
 * ```jsx
 * const khulnasoftProps = await fetchKhulnasoftProps({
 *    apiKey: 'API_KEY',
 *    // provide `url`
 *    url: yourPageUrl,
 *    // OR provide `path` + `searchParams`
 *    path: yourPath,
 *    searchParams: yourSearchParams,
 * });
 *
 * return <Content {...khulnasoftProps} />;
 * ```
 */
export const fetchKhulnasoftProps = async (
  _args: GetKhulnasoftPropsOptions
): Promise<ContentVariantsPrps> => {
  const urlPath =
    _args.path || _args.url?.pathname || _args.userAttributes?.urlPath;

  const getContentArgs: GetContentOptions = {
    ..._args,
    apiKey: _args.apiKey,
    model: _args.model || 'page',
    userAttributes: {
      ..._args.userAttributes,
      ...(urlPath ? { urlPath } : {}),
    },
    options: getKhulnasoftSearchParams(
      _args.searchParams || _args.url?.searchParams || _args.options
    ),
  };

  return {
    apiKey: getContentArgs.apiKey,
    model: getContentArgs.model,
    content: await fetchOneEntry(getContentArgs),
  };
};
