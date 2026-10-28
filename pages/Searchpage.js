
import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';

class SearchPage {
    constructor(page) {
        this.page = page;
        this.locationDropdown = page.locator('#location');
        this.hotelsDropdown = page.locator('#hotels');
        this.roomTypeDropdown = page.locator('#room_type');
        this.roomNosDropdown = page.locator('#room_nos');
        this.checkInInput = page.locator('#datepick_in');
        this.checkOutInput = page.locator('#datepick_out');
        this.adultsDropdown = page.locator('#adult_room');
        this.childrenDropdown = page.locator('#child_room');
        this.submitButton = page.locator('#Submit');
        this.resetButton = page.locator('#Reset');
        this.checkInError = page.locator('#checkin_span');
        this.checkOutError = page.locator('#checkout_span');
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }
    async goto() {
        await test.step('Open search page', async () => {
            await this.page.goto('./');
            await attachStepScreenshot(this.page, 'Search page opened');
        });
    }

    async searchHotel(sData) {
        await test.step('Search hotels', async () => {
            await this.locationDropdown.selectOption(sData.location);
            await this.hotelsDropdown.selectOption(sData.hotels);
            await this.roomTypeDropdown.selectOption(sData.roomType);
            await this.roomNosDropdown.selectOption(sData.roomNos);

            await this.checkInInput.fill('');
            await this.checkInInput.fill(sData.dateIn);

            await this.checkOutInput.fill('');
            await this.checkOutInput.fill(sData.dateOut);

            await this.adultsDropdown.selectOption(sData.adults);
            await this.childrenDropdown.selectOption(sData.children);

            await this.submitButton.click();
            await attachStepScreenshot(this.page, 'Hotel search submitted');
        });
    }

    async selectAndContinue() {
        await test.step('Select hotel and continue', async () => {
            await this.page.locator('#radiobutton_0').click();
            await this.page.locator('#continue').click();
            await attachStepScreenshot(this.page, 'Hotel selected');
        });
    }

    async resetForm() {
        await test.step('Reset search form', async () => {
            await this.resetButton.click();
            await attachStepScreenshot(this.page, 'Search form reset');
        });
    }
}

export default SearchPage;