
import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login');
        this.usernameErrorSpan = page.locator('#username_span');
        this.passwordErrorSpan = page.locator('#password_span');
        this.authError = page.locator('.auth_error b');
        this.forgotPasswordLink = page.locator('text=Forgot Password?');
        this.registerLink = page.locator('text=New User Register Here');
    }
    async goto() {
        await test.step('Open login page', async () => {
            await this.page.goto('./', { waitUntil: 'domcontentloaded' });
            await attachStepScreenshot(this.page, 'Login page opened');
        });
    }

    async login(username, password) {
        await test.step('Log in', async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
            await attachStepScreenshot(this.page, 'Login submitted');
        });
    }

    async loginWithUsernameOnly(username) {
        await test.step('Log in without password', async () => {
            await this.usernameInput.fill(username);
            await this.loginButton.click();
            await attachStepScreenshot(this.page, 'Login without password submitted');
        });
    }

    async submitLogin() {
        await test.step('Submit login form', async () => {
            await this.loginButton.click();
            await attachStepScreenshot(this.page, 'Login form submitted');
        });
    }

    async clickForgotPassword() {
        await test.step('Open forgot password page', async () => {
            await this.forgotPasswordLink.click();
            await attachStepScreenshot(this.page, 'Forgot password page opened');
        });
    }

    async clickRegister() {
        await test.step('Open registration page', async () => {
            await this.registerLink.click();
            await attachStepScreenshot(this.page, 'Registration page opened');
        });
    }
}

export default LoginPage;