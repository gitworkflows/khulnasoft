'use server';

import { revalidatePath } from 'next/cache';
import type { KhulnasoftContent } from '../../types/khulnasoft-content.js';
import { init } from './init.js';
import type { GlobalWCache } from './types.js';

export async function postPreviewContent({
  key,
  value,
  url,
}: {
  key: string;
  value: KhulnasoftContent;
  url: string;
}) {
  init();

  (globalThis as GlobalWCache)._KHULNASOFT_PREVIEW_LRU_CACHE.set(key, value);

  revalidatePath(url);
}
