import type { KhulnasoftContextInterface } from '../../context/types.js';
import { fetchOneEntry } from '../../functions/get-content/index.js';
import { logger } from '../../helpers/logger.js';
import type { KhulnasoftContent } from '../../types/khulnasoft-content.js';

export interface SymbolInfo {
  model?: string;
  entry?: string;
  data?: any;
  content?: KhulnasoftContent;
  inline?: boolean;
  dynamic?: boolean;
}

export const fetchSymbolContent = async ({
  khulnasoftContextValue,
  symbol,
}: {
  symbol: SymbolInfo | undefined;
  khulnasoftContextValue: KhulnasoftContextInterface;
}) => {
  /**
   * If:
   * - we have a symbol prop
   * - yet it does not have any content
   * - and we have not already stored content from before
   * - and it has a model name
   *
   * then we want to re-fetch the symbol content.
   */
  if (
    symbol?.model &&
    // This is a hack, we should not need to check for this, but it is needed for Svelte.
    khulnasoftContextValue?.apiKey
  ) {
    return fetchOneEntry({
      model: symbol.model,
      apiKey: khulnasoftContextValue.apiKey,
      apiVersion: khulnasoftContextValue.apiVersion,
      ...(symbol?.entry && {
        query: {
          id: symbol.entry,
        },
      }),
    }).catch((err) => {
      logger.error('Could not fetch symbol content: ', err);
      return undefined;
    });
  }
  return undefined;
};
