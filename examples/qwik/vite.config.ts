import { defineConfig } from 'vite';
import { qwikVite } from '@khulnasoft.com/qwik/optimizer';
import { qwikCity } from '@khulnasoft.com/qwik-city/vite';
import { khulnasoftDevTools } from '@khulnasoft.com/dev-tools/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
    plugins: [khulnasoftDevTools(), qwikCity(), qwikVite(), tsconfigPaths({ root: __dirname })],
  };
});
