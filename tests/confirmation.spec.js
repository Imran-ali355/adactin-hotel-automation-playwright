import { test, expect } from '@playwright/test';
import searchData from '../test_Data/searchData.json';
import bookData from '../test_Data/bookData.json';
import appConfig from '../test_Data/appConfig.json';
import LoginPage from '../pages/LoginPage';
import SearchPage from '../pages/Searchpage';
import BookPage from '../pages/BookPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import { attachStepScreenshot } from '../utils/screenshot';

test.describe('Adactin Hotel - Booking Confirmation Tests', () => {
    let confirmationPage;
    const search = searchData.validSearches[0];
    const booking = bookData.booking[0];

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const searchPage = new SearchPage(page);
        const bookPage = new BookPage(page);
        confirmationPage = new ConfirmationPage(page);
        const [expiryMonth, expiryYear] = booking.expirydate.split('/');

        await loginPage.goto();
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
        await searchPage.searchHotel(search);
        await searchPage.selectAndContinue();
        await bookPage.bookHotel(booking, expiryMonth, expiryYear);
        await expect(page).toHaveURL(new URL(appConfig.urls.expectedConfirmURL, process.env.BASE_URL).href, { timeout: 150000 });
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



    test('TC-021. Verify booking order number is generated', async ({ page }) => {
        await test.step('Verify order number', async () => {
            await expect(confirmationPage.orderNoInput).not.toHaveValue('');
            await attachStepScreenshot(page, 'Order number verified');
        });
    });

    test('TC-022. Verify booking confirmation message', async ({ page }) => {
        await test.step('Verify booking success message', async () => {
            await expect(confirmationPage.confirmationMessage).toBeVisible();
            await attachStepScreenshot(page, 'Booking success message verified');
        });
    });

    test('TC-023. Verify confirmed hotel booking details', async ({ page }) => {
        await test.step('Verify hotel booking details', async () => {
            await expect(confirmationPage.hotelName).toHaveValue(search.hotels);
            await expect(confirmationPage.location).toHaveValue(search.location);
            await expect(confirmationPage.roomType).toHaveValue(search.roomType);
            await attachStepScreenshot(page, 'Hotel booking details verified');
        });
    });
});
