import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';

class SelectHotelPage {
    constructor(page) {
        this.page = page;
        this.firstRadioButton = page.locator('#radiobutton_1');
        this.continueButton = page.locator('#continue');
    }

    async selectHotel() {
        await test.step('Select hotel and continue', async () => {
            await this.firstRadioButton.click();
            await this.continueButton.click();
            await attachStepScreenshot(this.page, 'Hotel selected');
        });
    }
}

export default SelectHotelPage;