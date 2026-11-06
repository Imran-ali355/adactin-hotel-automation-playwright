import { test, expect } from '@playwright/test';
const searchData = require('../test_Data/searchData.json');
const bookData = require('../test_Data/bookData.json');
const appConfig = require('../test_Data/appConfig.json');
import SearchPage from '../pages/Searchpage';
import BookPage from '../pages/BookPage';
import LoginPage from '../pages/LoginPage';
import { attachStepScreenshot } from '../utils/screenshot';

test.describe('Adactin Hotel - Booking Tests', () => {
    let searchPage;
    let bookPage;
    const sData = searchData.validSearches[0];

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        searchPage = new SearchPage(page);
        bookPage = new BookPage(page);

        await test.step('Navigate to Search URL and perform search to reach Book Page', async () => {
            await loginPage.goto();
            await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedSearchURL, process.env.BASE_URL).href, { timeout: appConfig.timeouts.searchReady });
            await searchPage.searchHotel(sData);
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);

            await searchPage.selectAndContinue();
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedBookURL, process.env.BASE_URL).href);
        });
    });
    test.afterEach(async ({ page }) => {
        try {
            const logout = new LogoutPage(page);
            if (await logout.logoutLink.isVisible({ timeout: appConfig.timeouts.logoutVisibility })) {
                await logout.gotoLogoutPage();
            }
        } catch (error) {
        }
    });



    test('TC-014. Successful Hotel Booking with Valid Data', async ({ page }) => {
        const bData = bookData.booking[0];
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await test.step('Fill valid booking details and submit', async () => {
            await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
        });

        await test.step('Verify successful booking confirmation and order number', async () => {
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedConfirmURL, process.env.BASE_URL).href, { timeout: appConfig.timeouts.bookingConfirmation });
            await expect(bookPage.orderNo).not.toHaveValue(bookData.formDefaults.emptyValue);
            await attachStepScreenshot(page, 'Booking confirmed');
        });
    });

    test('TC-015. Verify Error Message when First Name is Empty', async ({ page }) => {
        const bData = { ...bookData.booking[0], firstname: bookData.invalid.emptyFirstName };
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await test.step('Book hotel with empty first name', async () => {
            await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
        });

        await test.step('Verify first name error message is visible', async () => {
            await expect(bookPage.firstNameError).toBeVisible();
            await attachStepScreenshot(page, 'First name validation displayed');
        });
    });

    test('TC-016. Verify Error Message when Last Name is Empty', async ({ page }) => {
        const bData = { ...bookData.booking[0], lastname: bookData.invalid.emptyLastName };
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await test.step('Book hotel with empty last name', async () => {
            await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
        });

        await test.step('Verify last name error message is visible', async () => {
            await expect(bookPage.lastNameError).toBeVisible();
            await attachStepScreenshot(page, 'Last name validation displayed');
        });
    });

    test('TC-017. Verify Error Message with Invalid Credit Card Number', async ({ page }) => {
        const bData = { ...bookData.booking[0], creditcardnumber: bookData.invalid.shortCreditCardNumber };
        const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');

        await test.step('Book hotel with invalid credit card number', async () => {
            await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
        });

        await test.step('Verify credit card error message text', async () => {
            await expect(bookPage.ccNumError).toContainText(bookData.invalid.creditCardError);
            await attachStepScreenshot(page, 'Credit card validation displayed');
        });
    });

    test('TC-018. Verify Hotel Summary Details are Displayed on Booking Page', async ({ page }) => {
        await test.step('Verify hotel summary fields are populated', async () => {
            await expect(bookPage.hotelName).not.toHaveValue(bookData.formDefaults.emptyValue);
            await expect(bookPage.location).not.toHaveValue(bookData.formDefaults.emptyValue);
            await expect(bookPage.roomNumber).not.toHaveValue(bookData.formDefaults.emptyValue);
            await expect(bookPage.totalPrice).not.toHaveValue(bookData.formDefaults.emptyValue);
            await attachStepScreenshot(page, 'Hotel summary verified');
        });
    });

    test('TC-019. Verify Cancel Button redirects back to Select Page', async ({ page }) => {
        await test.step('Click cancel button on booking page', async () => {
            await bookPage.cancelBooking();
        });

        await test.step('Verify redirection back to Select URL', async () => {
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);
            await attachStepScreenshot(page, 'Booking cancellation verified');
        });
    });

    test('TC-020. Verify User can Logout directly from Booking Page', async ({ page }) => {
        await test.step('Logout and return from booking page', async () => {
            await bookPage.logoutAndReturn();
        });

        await test.step('Verify redirection to index URL', async () => {
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedindexURL, process.env.BASE_URL).href);
            await attachStepScreenshot(page, 'Logout verified');
        });
    });

    test('Verify selected hotel details match search data', async () => {
        await expect(bookPage.hotelName).toHaveValue(sData.hotels);
        await expect(bookPage.location).toHaveValue(sData.location);
    });

    test('Verify booking form fields start with configured defaults', async () => {
        await expect(bookPage.firstName).toHaveValue(bookData.formDefaults.firstname);
        await expect(bookPage.lastName).toHaveValue(bookData.formDefaults.lastname);
        await expect(bookPage.address).toHaveValue(bookData.formDefaults.billingaddress);
        await expect(bookPage.ccNum).toHaveValue(bookData.formDefaults.creditcardnumber);
        await expect(bookPage.cvv).toHaveValue(bookData.formDefaults.cvv);
    });

    test('Cancel returns to the configured hotel results page', async ({ page }) => {
        await bookPage.cancelBooking();

        await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);
    });

    test('Logout returns to the configured index page', async ({ page }) => {
        await bookPage.logoutAndReturn();

        await expect(page).toHaveURL(new URL(appConfig.urls.expectedindexURL, process.env.BASE_URL).href);
    });

});