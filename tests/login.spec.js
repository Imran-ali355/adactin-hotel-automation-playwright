import { test, expect } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';
import loginData from '../test_Data/loginData.json';
import appConfig from '../test_Data/appConfig.json';
import LoginPage from '../pages/LoginPage';

test.describe('Adactin Hotel - Login Tests ', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await test.step('Open Login Page', async () => {
            await loginPage.goto();
        });
    });



    test('TC-001. Verify Login Page elements and title are visible', async ({ page }) => {
        await test.step('Verify login page elements and title', async () => {
            await expect(loginPage.usernameInput).toBeVisible();
            await expect(loginPage.passwordInput).toBeVisible();
            await expect(loginPage.loginButton).toBeVisible();
            await attachStepScreenshot(page, 'Login page verified');
        });
    });

    test('TC-002. Should show "Enter Username" error when username field is empty', async ({ page }) => {
        await test.step('Click login button with empty fields', async () => {
            await loginPage.submitLogin();
        });
        await test.step('Verify username validation', async () => {
            await expect(loginPage.usernameErrorSpan).toBeVisible();
            await expect(loginPage.usernameErrorSpan).toContainText(loginData.validation.usernameRequired);
            await attachStepScreenshot(page, 'Username validation displayed');
        });
    });

    test('TC-003. Should show invalid login error when password is empty', async ({ page }) => {
        await test.step('Enter username and click login', async () => {
            await loginPage.loginWithUsernameOnly(process.env.USERNAME);
        });
        await test.step('Verify password validation', async () => {
            await expect(loginPage.passwordErrorSpan).toBeVisible();
            await expect(loginPage.passwordErrorSpan).toContainText(loginData.validation.passwordRequired);
            await attachStepScreenshot(page, 'Password validation displayed');
        });
    });

    loginData.invalid.forEach((data, index) => {
        test(`TC-004.${index + 1} Should fail login with invalid credentials (${data.username})`, async ({ page }) => {
            await test.step(`Login with invalid credentials: ${data.username}`, async () => {
                await loginPage.login(data.username, data.password);
            });
            await test.step('Verify invalid login message', async () => {
                await expect(loginPage.authError).toBeVisible();
                await expect(loginPage.authError).toContainText(loginData.validation.invalidCredentials);
                await attachStepScreenshot(page, `Invalid login ${index + 1} verified`);
            });
        });
    });

    test('TC-005. Verify Forgot Password link navigation', async ({ page }) => {
        await expect(loginPage.forgotPasswordLink).toBeVisible();
        await test.step('Click Forgot Password link', async () => {
            await loginPage.clickForgotPassword();
        });
        await test.step('Verify Forgot Password navigation', async () => {
            await expect(page).toHaveURL(new URL(loginData.navigation.forgotPasswordURL, process.env.BASE_URL).href);
            await attachStepScreenshot(page, 'Forgot password navigation verified');
        });
    });

    test('TC-006. Verify New User Registration link navigation', async ({ page }) => {
        await expect(loginPage.registerLink).toBeVisible();
        await test.step('Click Register link', async () => {
            await loginPage.clickRegister();
        });
        await test.step('Verify registration navigation', async () => {
            await expect(page).toHaveURL(new URL(loginData.navigation.registerURL, process.env.BASE_URL).href);
            await attachStepScreenshot(page, 'Registration navigation verified');
        });
    });

    test('TC-007. Should login successfully with valid credentials and save auth session', async ({ page }) => {
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
        });
        await test.step('Verify successful login', async () => {
            await expect(page).toHaveURL(new URL(appConfig.urls.expectedSearchURL, process.env.BASE_URL).href);
            await attachStepScreenshot(page, 'Successful login verified');
        });
    });
});