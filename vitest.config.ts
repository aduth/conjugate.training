import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    projects: [
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
          setupFiles: './test/features/setup.ts',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
        optimizeDeps: {
          include: ['react/jsx-dev-runtime'],
        },
      },
    ],
  },
});
