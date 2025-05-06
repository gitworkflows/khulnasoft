/**
 * This is an LRU cache to hold preview content on the server-side.
 *
 * Note: This logic is only used by the NextJS SDK.
 */

import type { KhulnasoftContent } from '../../types/khulnasoft-content.js';
import type { LRUCache } from './helpers.js';

type KhulnasoftLRUCache = LRUCache<string, KhulnasoftContent>;

export type GlobalWCache = typeof globalThis & {
  _KHULNASOFT_PREVIEW_LRU_CACHE: KhulnasoftLRUCache;
};
