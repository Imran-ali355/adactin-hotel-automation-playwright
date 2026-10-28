import { test } from '@playwright/test';

export async function attachStepScreenshot(page, stepName) {
  await test.info().attach(stepName, {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
}