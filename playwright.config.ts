import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html'],
    ['./qase-reporter.js'] // นี่คือตัว Custom Reporter ของเรา
  ],
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
});
