# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking.spec.js >> Adactin Hotel -  >> TC-014. Successful Hotel Booking with Valid Data
- Location: tests\booking.spec.js:40:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://adactinhotelapp.com/HotelAppBuild2/SelectHotel.php"
Received: "https://adactinhotelapp.com/HotelAppBuild2/SearchHotel.php"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html xmlns="http://www.w3.org/1999/xhtml">…</html>
       - unexpected value "https://adactinhotelapp.com/HotelAppBuild2/SearchHotel.php"

```

```yaml
- table:
  - rowgroup:
    - 'row "Adactin Group Adactin Group: Hotel Reservation System"':
      - cell "Adactin Group":
        - img "Adactin Group"
      - 'cell "Adactin Group: Hotel Reservation System"':
        - 'img "Adactin Group: Hotel Reservation System"'
    - row:
      - cell
- table:
  - rowgroup:
    - row "Welcome to Adactin Group of Hotels Hello imranali! Search Hotel | Booked Itinerary | Change Password | Logout Adactin Hotel Mobile App DOWNLOAD the Hotel Mobile App and extend your experience. Click to know more about how to get the app on Android or IOS. HotelApp Web Services Access Hotel App SOAP and Rest Services to learn web services testing. Click to know more. Sample TestCases DOWNLOAD a complete set of readymade sample TEST CASES for this application. Enjoy automation! Known Defects DOWNLOAD list of known defects for this application. Book on Automation About Adactin Get solutions for all your testing needs. Visit www.adactin.com today!":
      - cell "Welcome to Adactin Group of Hotels"
      - cell "Hello imranali! Search Hotel | Booked Itinerary | Change Password | Logout":
        - textbox: Hello imranali!
        - link "Search Hotel":
          - /url: SearchHotel.php
        - text: "|"
        - link "Booked Itinerary":
          - /url: BookedItinerary.php
        - text: "|"
        - link "Change Password":
          - /url: ChangePassword.php
        - text: "|"
        - link "Logout":
          - /url: Logout.php
      - cell "Adactin Hotel Mobile App DOWNLOAD the Hotel Mobile App and extend your experience. Click to know more about how to get the app on Android or IOS. HotelApp Web Services Access Hotel App SOAP and Rest Services to learn web services testing. Click to know more. Sample TestCases DOWNLOAD a complete set of readymade sample TEST CASES for this application. Enjoy automation! Known Defects DOWNLOAD list of known defects for this application. Book on Automation About Adactin Get solutions for all your testing needs. Visit www.adactin.com today!":
        - table:
          - rowgroup:
            - row "Adactin Hotel Mobile App DOWNLOAD the Hotel Mobile App and extend your experience. Click to know more about how to get the app on Android or IOS.":
              - cell "Adactin Hotel Mobile App DOWNLOAD the Hotel Mobile App and extend your experience. Click to know more about how to get the app on Android or IOS.":
                - heading "Adactin Hotel Mobile App" [level=4]
                - link "DOWNLOAD":
                  - /url: https://adactinhotelapp.com/resources/AdactinHotelApp_SetupGuide.pdf
                - text: the Hotel Mobile App and extend your experience. Click to know more about how to get the app on Android or IOS.
            - row "HotelApp Web Services Access Hotel App SOAP and Rest Services to learn web services testing. Click to know more.":
              - cell "HotelApp Web Services Access Hotel App SOAP and Rest Services to learn web services testing. Click to know more.":
                - heading "HotelApp Web Services" [level=4]
                - text: Access Hotel App SOAP and Rest Services to learn web services testing.
                - link "Click":
                  - /url: https://adactinhotelapp.com/HotelAdactinWebServices/
                - text: to know more.
            - row "Sample TestCases DOWNLOAD a complete set of readymade sample TEST CASES for this application. Enjoy automation!":
              - cell "Sample TestCases DOWNLOAD a complete set of readymade sample TEST CASES for this application. Enjoy automation!":
                - heading "Sample TestCases" [level=4]
                - link "DOWNLOAD":
                  - /url: http://adactinhotelapp.com/resources/Sample-TestCases_HotelApplication.pdf
                - text: a complete set of readymade sample TEST CASES for this application. Enjoy automation!
            - row "Known Defects DOWNLOAD list of known defects for this application.":
              - cell "Known Defects DOWNLOAD list of known defects for this application.":
                - heading "Known Defects" [level=4]
                - link "DOWNLOAD":
                  - /url: http://adactinhotelapp.com/resources/KnownDefects_HotelApp.pdf
                - text: list of known defects for this application.
            - row "Book on Automation":
              - cell "Book on Automation":
                - heading "Book on Automation" [level=4]
                - iframe
            - row "About Adactin Get solutions for all your testing needs. Visit www.adactin.com today!":
              - cell "About Adactin Get solutions for all your testing needs. Visit www.adactin.com today!":
                - heading "About Adactin" [level=4]
                - text: Get solutions for all your testing needs. Visit
                - link "www.adactin.com":
                  - /url: http://www.adactin.com
                - text: today!
    - row "Search Hotel (Fields marked with Red asterix (*) are mandatory) Location* Sydney Hotels Hotel Creek Room Type Standard Number of Rooms* 1 - One Check In Date* 28/10/2026 (dd/mm/yyyy) Check-In Date should be either Today or Later Date Check Out Date* 31/10/2026 (dd/mm/yyyy) Adults per Room* 2 - Two Children per Room 1 - One Search Reset":
      - cell "Search Hotel (Fields marked with Red asterix (*) are mandatory) Location* Sydney Hotels Hotel Creek Room Type Standard Number of Rooms* 1 - One Check In Date* 28/10/2026 (dd/mm/yyyy) Check-In Date should be either Today or Later Date Check Out Date* 31/10/2026 (dd/mm/yyyy) Adults per Room* 2 - Two Children per Room 1 - One Search Reset":
        - table:
          - rowgroup:
            - row "Search Hotel (Fields marked with Red asterix (*) are mandatory)":
              - cell "Search Hotel (Fields marked with Red asterix (*) are mandatory)"
            - row "Location* Sydney":
              - cell "Location*"
              - cell "Sydney":
                - combobox:
                  - option "- Select Location -"
                  - option "Sydney" [selected]
                  - option "Melbourne"
                  - option "Brisbane"
                  - option "Adelaide"
                  - option "London"
                  - option "New York"
                  - option "Los Angeles"
                  - option "Paris"
            - row "Hotels Hotel Creek":
              - cell "Hotels"
              - cell "Hotel Creek":
                - combobox:
                  - option "- Select Hotel -"
                  - option "Hotel Creek" [selected]
                  - option "Hotel Sunshine"
                  - option "Hotel Hervey"
                  - option "Hotel Cornice"
            - row "Room Type Standard":
              - cell "Room Type"
              - cell "Standard":
                - combobox:
                  - option "- Select Room Type -"
                  - option "Standard" [selected]
                  - option "Double"
                  - option "Deluxe"
                  - option "Super Deluxe"
            - row "Number of Rooms* 1 - One":
              - cell "Number of Rooms*"
              - cell "1 - One":
                - combobox:
                  - option "- Select Number of Rooms -"
                  - option "1 - One" [selected]
                  - option "2 - Two"
                  - option "3 - Three"
                  - option "4 - Four"
                  - option "5 - Five"
                  - option "6 - Six"
                  - option "7 - Seven"
                  - option "8 - Eight"
                  - option "9 - Nine"
                  - option "10 - Ten"
            - row "Check In Date* 28/10/2026 (dd/mm/yyyy) Check-In Date should be either Today or Later Date":
              - cell "Check In Date*"
              - cell "28/10/2026 (dd/mm/yyyy) Check-In Date should be either Today or Later Date":
                - textbox: 28/10/2026
                - text: (dd/mm/yyyy) Check-In Date should be either Today or Later Date
            - row "Check Out Date* 31/10/2026 (dd/mm/yyyy)":
              - cell "Check Out Date*"
              - cell "31/10/2026 (dd/mm/yyyy)":
                - textbox: 31/10/2026
                - text: (dd/mm/yyyy)
            - row "Adults per Room* 2 - Two":
              - cell "Adults per Room*"
              - cell "2 - Two":
                - combobox:
                  - option "- Select Adults per Room -"
                  - option "1 - One"
                  - option "2 - Two" [selected]
                  - option "3 - Three"
                  - option "4 - Four"
            - row "Children per Room 1 - One":
              - cell "Children per Room"
              - cell "1 - One":
                - combobox:
                  - option "- Select Children per Room -"
                  - option "1 - One" [selected]
                  - option "2 - Two"
                  - option "3 - Three"
                  - option "4 - Four"
            - row "Search Reset":
              - cell
              - cell "Search Reset":
                - button "Search"
                - button "Reset"
- table:
  - rowgroup:
    - row:
      - cell
    - row "© 2026 - Adactin.com. All Rights Reserved. Adactin Group Pty. Ltd.":
      - cell "© 2026 - Adactin.com. All Rights Reserved. Adactin Group Pty. Ltd.":
        - text: © 2026 -
        - link "Adactin.com":
          - /url: http://www.adactin.com
        - text: . All Rights Reserved. Adactin Group Pty. Ltd.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | const searchData = require('../test_Data/searchData.json');
  3   | const bookData = require('../test_Data/bookData.json');
  4   | const appConfig = require('../test_Data/appConfig.json');
  5   | import SearchPage from '../pages/Searchpage';
  6   | import BookPage from '../pages/BookPage';
  7   | import { attachStepScreenshot } from '../utils/screenshot';
  8   | 
  9   | test.describe('Adactin Hotel - ', () => {
  10  |     let searchPage;
  11  |     let bookPage;
  12  |     const sData = searchData.validSearches[0];
  13  | 
  14  |     test.beforeEach(async ({ page }) => {
  15  |         searchPage = new SearchPage(page);
  16  |         bookPage = new BookPage(page);
  17  | 
  18  |         await page.goto(appConfig.urls.expectedSearchURL);
  19  |         await expect(page).toHaveURL(new URL(appConfig.urls.expectedSearchURL, process.env.BASE_URL).href, { timeout: 90000 });
  20  | 
  21  |         await searchPage.searchHotel(sData);
  22  | 
> 23  |         await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  24  | 
  25  |         await searchPage.selectAndContinue();
  26  |         await expect(page).toHaveURL(new URL(appConfig.urls.expectedBookURL, process.env.BASE_URL).href);
  27  |     });
  28  |     test.afterEach(async ({ page }) => {
  29  |         try {
  30  |             const logout = new LogoutPage(page);
  31  |             if (await logout.logoutLink.isVisible({ timeout: 2000 })) {
  32  |                 await logout.gotoLogoutPage();
  33  |             }
  34  |         } catch (error) {
  35  |         }
  36  |     });
  37  | 
  38  | 
  39  | 
  40  |     test('TC-014. Successful Hotel Booking with Valid Data', async ({ page }) => {
  41  |         const bData = bookData.booking[0];
  42  |         const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');
  43  | 
  44  |         await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
  45  |         await expect(page).toHaveURL(new URL(appConfig.urls.expectedConfirmURL, process.env.BASE_URL).href, { timeout: 150000 });
  46  | 
  47  |         await test.step('Verify booking confirmation', async () => {
  48  |             await expect(bookPage.orderNo).not.toHaveValue('');
  49  |             await attachStepScreenshot(page, 'Booking confirmed');
  50  |         });
  51  |     });
  52  | 
  53  | 
  54  | 
  55  |     test('TC-015. Verify Error Message when First Name is Empty', async ({ page }) => {
  56  | 
  57  |         const bData = { ...bookData.booking[0], firstname: '' };
  58  |         const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');
  59  | 
  60  |         await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
  61  | 
  62  |         await test.step('Verify first name validation', async () => {
  63  |             await expect(bookPage.firstNameError).toBeVisible();
  64  |             await attachStepScreenshot(page, 'First name validation displayed');
  65  |         });
  66  |     });
  67  | 
  68  | 
  69  |     test('TC-016. Verify Error Message when Last Name is Empty', async ({ page }) => {
  70  |         const bData = { ...bookData.booking[0], lastname: '' };
  71  |         const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');
  72  | 
  73  |         await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
  74  | 
  75  |         await test.step('Verify last name validation', async () => {
  76  |             await expect(bookPage.lastNameError).toBeVisible();
  77  |             await attachStepScreenshot(page, 'Last name validation displayed');
  78  |         });
  79  |     });
  80  | 
  81  | 
  82  |     test('TC-017. Verify Error Message with Invalid Credit Card Number', async ({ page }) => {
  83  |         const bData = { ...bookData.booking[0], creditcardnumber: '12345' };
  84  |         const [expiryMonth, fullExpiryYear] = bData.expirydate.split('/');
  85  | 
  86  |         await bookPage.bookHotel(bData, expiryMonth, fullExpiryYear);
  87  | 
  88  |         await test.step('Verify credit card validation', async () => {
  89  |             await expect(bookPage.ccNumError).toContainText('Please Enter your 16 Digit Credit Card Number');
  90  |             await attachStepScreenshot(page, 'Credit card validation displayed');
  91  |         });
  92  |     });
  93  | 
  94  | 
  95  |     test('TC-019. Verify Cancel Button redirects back to Select Page', async ({ page }) => {
  96  |         await bookPage.cancelBooking();
  97  |         await test.step('Verify booking cancellation', async () => {
  98  |             await expect(page).toHaveURL(new URL(appConfig.urls.expectedSelectURL, process.env.BASE_URL).href);
  99  |             await attachStepScreenshot(page, 'Booking cancellation verified');
  100 |         });
  101 |     });
  102 | 
  103 | 
  104 | 
  105 |     test.skip('TC-020. Verify User can Logout directly from Booking Page', async ({ page }) => {
  106 |         await bookPage.logoutAndReturn();
  107 |         await test.step('Verify logout', async () => {
  108 |             await expect(page).toHaveURL(new URL(appConfig.urls.expectedindexURL, process.env.BASE_URL).href);
  109 |             await attachStepScreenshot(page, 'Logout verified');
  110 |         });
  111 |     });
  112 | 
  113 | });
```