import test from '../src/lib/BaseTest';
import ENV from "../src/lib/env";


test.beforeEach(async ({ page, landingPage }) => {
  await page.goto(ENV.baseURL, { waitUntil: 'domcontentloaded' });
  await landingPage.acceptCookies();
   await landingPage.clickPerfumAndVerifyTitle();
})

test('Apply multiple filters together', async ({ filtersPage }) => {
  await filtersPage.applyMultipleFilters();
});

test('Clear all applied filters', async ({ filtersPage }) => {
  await filtersPage.clearAllFilters();
});

