import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      name: 'node',
      dir: './src',
      environment: 'happy-dom',
      globals: true,
      setupFiles: './test/setup.ts',
    },
    optimizeDeps: {
      include: ['react/jsx-dev-runtime'],
    },
  },
  {
    test: {
      name: 'browser',
      dir: './test/features',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
    },
    optimizeDeps: {
      include: ['react/jsx-dev-runtime'],
    },
  },
]);
