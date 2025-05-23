import { qwikCity } from '@khulnasoft.com/qwik-city/vite';
import { qwikVite } from '@khulnasoft.com/qwik/optimizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite(),
      tsconfigPaths({ projects: ['./tsconfig.json'] }),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
