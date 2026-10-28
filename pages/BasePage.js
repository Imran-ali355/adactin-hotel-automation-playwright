import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';

class BasePage {
  constructor(page) {
    this.page = page;
  }
  async navigateTo(url) {
    await test.step('Navigate to page', async () => {
      await this.page.goto(url);
      await attachStepScreenshot(this.page, 'Page opened');
    });
  };
}
export default BasePage;