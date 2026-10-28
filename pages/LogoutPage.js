import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';

class LogoutPage
{
    constructor(page)
    {
        this.page = page;
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.loginAgainLink = page.getByRole('link', { name: 'Click here to login again' });
    }
 
    async gotoLogoutPage()
    {
         await test.step('Log out', async () => {
             await this.logoutLink.click();
             await attachStepScreenshot(this.page, 'Logged out');
         });
    }
}
 
export default LogoutPage;