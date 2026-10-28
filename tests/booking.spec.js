import { test, expect } from '@playwright/test';
const searchData = require('../test_Data/searchData.json');
const bookData = require('../test_Data/bookData.json');
const appConfig = require('../test_Data/appConfig.json');
import SearchPage from '../pages/Searchpage';
import BookPage from '../pages/BookPage';
import { attachStepScreenshot } from '../utils/screenshot';

test.describe('Adactin Hotel - ', () => {
    let searchPage;
    let bookPage;
    const sData = searchData.validSearches[0];

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        bookPage = new BookPage(page);

        await page.goto(appConfig.urls.expectedSearchURL);
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedSearchURL, process.env.BASE_URL).href, { timeout: 90000 });

        await searchPage.searchHotel(sData);

        await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);

        await searchPage.selectAndContinue();
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedBookURL, process.env.BASE_URL).href);
    });
    test.afterEach(async ({ page }) => {
        try {
            const logout = new LogoutPage(page);
            if (await logout.logoutLink.isVisible({ timeout: 2000 })) {
                await logout.gotoLogoutPage();
            }
        } catch (error) {
        }
    });



    test('TC-014. Successful Hotel Booking with Valid Data', async ({ page }) => {
        const bData = bookData.booking[0];
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedConfirmURL, process.env.BASE_URL).href, { timeout: 150000 });

        await test.step('Verify booking confirmation', async () => {
            await expect(bookPage.orderNo).not.toHaveValue('');
            await attachStepScreenshot(page, 'Booking confirmed');
        });
    });



    test('TC-015. Verify Error Message when First Name is Empty', async ({ page }) => {

        const bData = { ...bookData.booking[0], firstname: '' };
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);

        await test.step('Verify first name validation', async () => {
            await expect(bookPage.firstNameError).toBeVisible();
            await attachStepScreenshot(page, 'First name validation displayed');
        });
    });


    test('TC-016. Verify Error Message when Last Name is Empty', async ({ page }) => {
        const bData = { ...bookData.booking[0], lastname: '' };
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);

        await test.step('Verify last name validation', async () => {
            await expect(bookPage.lastNameError).toBeVisible();
            await attachStepScreenshot(page, 'Last name validation displayed');
        });
    });


    test('TC-017. Verify Error Message with Invalid Credit Card Number', async ({ page }) => {
        const bData = { ...bookData.booking[0], creditcardnumber: '12345' };
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);

        await test.step('Verify credit card validation', async () => {
            await expect(bookPage.ccNumError).toContainText('Please Enter your 16 Digit Credit Card Number');
            await attachStepScreenshot(page, 'Credit card validation displayed');
        });
    });


    test('TC-019. Verify Cancel Button redirects back to Select Page', async ({ page }) => {
        await bookPage.cancelBooking();
        await test.step('Verify booking cancellation', async () => {
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);
            await attachStepScreenshot(page, 'Booking cancellation verified');
        });
    });



    test.skip('TC-020. Verify User can Logout directly from Booking Page', async ({ page }) => {
        await bookPage.logoutAndReturn();
        await test.step('Verify logout', async () => {
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedindexURL, process.env.BASE_URL).href);
            await attachStepScreenshot(page, 'Logout verified');
        });
    });

});