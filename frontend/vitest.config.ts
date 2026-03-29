import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
      exclude: ['src/main.ts', 'src/app/app.config.ts', '**/*.interface.ts', '**/*.mock.ts'],
    },
  },
});
