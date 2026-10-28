import { test as base } from '@playwright/test'; 
import BasePage from '../pages/BasePage.js'; 
export const test = base.extend({ 
pageSetup: [ 
async ({ page }, use) => { 
const basePage = new BasePage(page); 
await basePage.navigateTo(process.env.BASE_URL); 
await use(); 
},
{ auto: true }, 
], 
}); 
export { expect } from '@playwright/test';