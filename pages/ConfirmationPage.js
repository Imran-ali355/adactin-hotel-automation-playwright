import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';

class ConfirmationPage {
    constructor(page) {
        this.page = page;
        this.orderNoInput = page.locator('#order_no');
        this.confirmationMessage = page.getByText('Booking Confirmation', { exact: true });
        this.hotelName = page.locator('#hotel_name');
        this.location = page.locator('#location');
        this.roomType = page.locator('#room_type');
        this.roomCount = page.locator('#total_rooms');
        this.searchButton = page.getByRole('button', { name: 'Search Hotel' });
        this.myItineraryButton = page.getByRole('button', { name: 'My Itinerary' });
       
    }

    async clickSearch() {
        await test.step('Return to hotel search', async () => {
            await this.searchButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.searchButton.click();
            await attachStepScreenshot(this.page, 'Hotel search opened');
        });
    }

    async clickMyItinerary() {
        await test.step('Open itinerary', async () => {
            await this.myItineraryButton.waitFor({ state: 'visible', timeout: 15000 });
            await this.myItineraryButton.click();
            await attachStepScreenshot(this.page, 'Itinerary opened');
        });
    }

 
};
export default ConfirmationPage;