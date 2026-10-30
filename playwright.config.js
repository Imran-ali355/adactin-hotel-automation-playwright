// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
//insure that the required environment variables are set
dotenv.config({ override: true });

for (const variable of ['BASE_URL', 'USERNAME', 'PASSWORD']) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
timeout: 60000, // 60 seconds per test

  // globalSetup: './utils/global-setup.js',
  // globalTeardown: './utils/global-teardown.js',
  /* Run tests in files in parallel */
  fullyParallel: false,
  //workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: 1,
  /* Opt out of parallel tests on CI. */
 // workers: process.env.CI ? 1 : undefined,
 workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  // reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  //reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    storageState: './auth.json',
    actionTimeout: 15000, // 15 seconds for clicks/inputs
  navigationTimeout: 30000,

    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    //  slowMo: 5000,
    screenshot: 'only-on-failure',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth-chromium.json',
      },
      dependencies: ['setup'],

    },
    {
      name: 'setup-firefox',
      testMatch: /auth\.setup\.js/,
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'auth-firefox.json',
      },
      dependencies: ['setup-firefox'],
    },
    {
      name: 'setup-webkit',
      testMatch: /auth\.setup\.js/,
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'auth-webkit.json',
      },
      dependencies: ['setup-webkit'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
