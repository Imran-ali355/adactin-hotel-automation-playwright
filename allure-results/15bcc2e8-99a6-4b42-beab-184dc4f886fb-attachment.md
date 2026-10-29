# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.js >> authenticate
- Location: tests\auth.setup.js:6:6

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://adactinhotelapp.com/HotelAppBuild2/SearchHotel.php"
Received: "chrome-error://chromewebdata/"

Call log:
  - Expect "toHaveURL" with timeout 90000ms
    100 × locator resolved to <html>…</html>
        - unexpected value "chrome-error://chromewebdata/"
  - Test timeout of 60000ms exceeded.

```

# Test source

```ts
  1  | import { test as setup, expect } from '@playwright/test';
  2  | import LoginPage from '../pages/LoginPage';
  3  | import appConfig from '../test_Data/appConfig.json';
  4  | import { attachStepScreenshot } from '../utils/screenshot';
  5  | 
  6  | setup('authenticate', async ({ page }) => {
  7  |     const loginPage = new LoginPage(page);
  8  |     await loginPage.goto();
  9  | 
  10 |     await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
  11 | 
  12 |     await setup.step('Verify authentication', async () => {
> 13 |         await expect(page).toHaveURL(new URL(appConfig.urls.expectedSearchURL, process.env.BASE_URL).href, { timeout: 90000 });
     |                            ^ Error: expect(page).toHaveURL(expected) failed
  14 |         await attachStepScreenshot(page, 'Authentication setup verified');
  15 |     });
  16 | 
  17 |     const browserName = page.context().browser().browserType().name();
  18 |     await page.context().storageState({ path: `auth-${browserName}.json`});
  19 | });
```