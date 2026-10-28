// class BookPage {
//     constructor(page) {
//         this.page = page;
//         this.firstName = page.locator('#first_name');
//         this.lastName = page.locator('#last_name');
//         this.address = page.locator('#address');
//         this.ccNum = page.locator('#cc_num');
//         this.ccTypeSelect = page.locator('#cc_type');
//         this.expMonth = page.locator('#cc_exp_month');
//         this.expYear = page.locator('#cc_exp_year');
//         this.cvv = page.locator('#cc_cvv');
//         // this.bookNowBtn = page.getByRole('button', { name: 'Book Now' });
//         this.bookNowBtn = page.locator('#book_now');
//         this.cancelBtn = page.locator('#cancel');
//         this.orderNo = page.locator('#order_no');
//       this.logoutBtn = page.getByRole('link', { name: 'Logout' });
//         this.indexLink = page.locator('a[href="index.php"]');
//         this.firstNameError = page.locator('#first_name_span');
//         this.ccNumError = page.locator('#cc_num_span');
//         this.ccCvvError = page.locator('#cc_cvv_span');
//     }

//     async bookHotel(data, expiryMonth, fullExpiryYear) {
//         await this.firstName.fill(data.firstname);
//         await this.lastName.fill(data.lastname);
//         await this.address.fill(data.billingaddress);
//         await this.ccNum.fill(data.creditcardnumber);
//         await this.ccTypeSelect.selectOption(data.creditcardtype);

//         const monthIndex = Number(expiryMonth);
//         if (!Number.isNaN(monthIndex) && monthIndex >= 1 && monthIndex <= 12) {
//             await this.expMonth.selectOption({ index: monthIndex - 1 });
//         } else {
//             await this.expMonth.selectOption({ label: expiryMonth });
//         }

//         await this.expYear.selectOption({ label: fullExpiryYear });
//         await this.cvv.fill(data.cvv);
//         await this.bookNowBtn.click();
//     }

//         async logoutAndReturn() {
//         await this.logoutBtn.click();
//         await this.indexLink.click();
//     }
// };
// export default BookPage;
import { test } from '@playwright/test';
import { attachStepScreenshot } from '../utils/screenshot';

class BookPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.address = page.locator('#address');
        this.ccNum = page.locator('#cc_num');
        this.ccTypeSelect = page.locator('#cc_type');
        this.expMonth = page.locator('#cc_exp_month');
        this.expYear = page.locator('#cc_exp_year');
        this.cvv = page.locator('#cc_cvv');
        this.bookNowBtn = page.locator('#book_now');
        this.cancelBtn = page.locator('#cancel');
        this.orderNo = page.locator('#order_no');
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
        this.indexLink = page.locator('a[href="index.php"]');
        this.firstNameError = page.locator('#first_name_span');
        this.lastNameError = page.locator('#last_name_span');
        this.ccNumError = page.locator('#cc_num_span');
        this.ccCvvError = page.locator('#cc_cvv_span');
        this.hotelName = page.locator('#hotel_name_dis');
        this.location = page.locator('#location_dis');
        this.roomNumber = page.locator('#room_num_dis');
        this.totalPrice = page.locator('#total_price_dis');
    }

    async bookHotel(data, expiryMonth, fullExpiryYear) {
        await test.step('Submit hotel booking', async () => {
            await this.firstName.fill(data.firstname);
            await this.lastName.fill(data.lastname);
            await this.address.fill(data.billingaddress);

            await this.ccNum.fill(data.creditcardnumber);
            await this.ccTypeSelect.selectOption(data.creditcardtype);

            const monthIndex = Number(expiryMonth);
            if (!Number.isNaN(monthIndex) && monthIndex >= 1 && monthIndex <= 12) {
                await this.expMonth.selectOption({ index: monthIndex - 1 });
            } else {
                await this.expMonth.selectOption({ label: expiryMonth });
            }

            await this.expYear.selectOption({ label: fullExpiryYear });
            await this.cvv.fill(data.cvv);

            await this.bookNowBtn.click();
            await attachStepScreenshot(this.page, 'Hotel booking submitted');
        });
    }

    async logoutAndReturn() {
        await test.step('Log out and return to login', async () => {
            await this.logoutBtn.click();
            await this.indexLink.click();
            await attachStepScreenshot(this.page, 'Logged out');
        });
    }

    async cancelBooking() {
        await test.step('Cancel hotel booking', async () => {
            await this.cancelBtn.click();
            await attachStepScreenshot(this.page, 'Booking cancelled');
        });
    }
}
export default BookPage;