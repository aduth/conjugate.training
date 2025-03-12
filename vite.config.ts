import { relative } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const SPLIT_BUNDLE_PACKAGES = new Set([
  '@radix-ui',
  'dexie',
  'dexie-cloud-addon',
  'react-day-picker',
  'react-dom',
  'recharts',
  'sonner',
  'vaul',
  'zod',
]);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          const relativePath = relative(import.meta.dirname, id);
          if (!relativePath.startsWith('node_modules/')) return;
          const pkg = relativePath.split('/')[1];
          if (SPLIT_BUNDLE_PACKAGES.has(pkg)) return pkg;
        },
      },
    },
  },
});
