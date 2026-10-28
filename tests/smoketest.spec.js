import { test, expect } from '@playwright/test';
const searchData = require('../test_Data/searchData.json');
const bookData = require('../test_Data/bookData.json');
const appConfig = require('../test_Data/appConfig.json');
import SearchPage from '../pages/Searchpage';
import BookPage from '../pages/BookPage';
import LoginPage from '../pages/LoginPage';
import { attachStepScreenshot } from '../utils/screenshot';

test.use({ storageState: { cookies: [], origins: [] } });

test('Login and book hotel', async ({ page }) => {

    const searchPage = new SearchPage(page);
    const bookPage = new BookPage(page);
    const loginPage = new LoginPage(page);

    const sData = searchData.validSearches[0];
    const bData = bookData.booking[0];

    await loginPage.goto();
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
    await test.step('Verify search page after login', async () => {
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedSearchURL, process.env.BASE_URL).href, { timeout: 90000 });
        await attachStepScreenshot(page, 'Search page after login verified');
    });

    await searchPage.searchHotel(sData);
    await test.step('Verify hotel search results', async () => {
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);
        await attachStepScreenshot(page, 'Hotel search results verified');
    });

    await searchPage.selectAndContinue();
    await test.step('Verify booking page', async () => {
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedBookURL, process.env.BASE_URL).href);
        await attachStepScreenshot(page, 'Booking page verified');
    });

    const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

    await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
    await test.step('Verify booking confirmation', async () => {
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedConfirmURL, process.env.BASE_URL).href, { timeout: 90000 });
        await attachStepScreenshot(page, 'Booking confirmation verified');
    });
    await test.step('Verify order number', async () => {
        await expect(bookPage.orderNo).not.toHaveValue('');
        await attachStepScreenshot(page, 'Order number verified');
    });

    await bookPage.logoutAndReturn();
    await test.step('Verify logout after booking', async () => {
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedindexURL, process.env.BASE_URL).href);
        await attachStepScreenshot(page, 'Hotel booking completed');
    });
});
