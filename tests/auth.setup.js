import { test as setup, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import appConfig from '../test_Data/appConfig.json';
import { attachStepScreenshot } from '../utils/screenshot';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);

    await setup.step('Verify authentication', async () => {
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedSearchURL, process.env.BASE_URL).href, { timeout: 90000 });
        await attachStepScreenshot(page, 'Authentication setup verified');
    });

    const browserName = page.context().browser().browserType().name();
    await page.context().storageState({ path: `auth-${browserName}.json`});
});