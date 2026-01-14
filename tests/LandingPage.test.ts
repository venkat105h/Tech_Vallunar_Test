import test from '../src/lib/BaseTest';
import ENV from "../src/lib/env";


test.beforeEach(async ({ page, landingPage }) => {
  await page.goto(ENV.baseURL, { waitUntil: 'domcontentloaded' });
  await landingPage.acceptCookies();
})

test('Verify Parfum landing page UI', async ({ landingPage }) => {
  await landingPage.landingPageUIValidation();
});


test('Sort products by price (Low to High)', async ({ landingPage }) => {
  await landingPage.sortProducts();
});

test('Load more / pagination works', async ({ landingPage }) => {
  await landingPage.loadMorepaginationValidation();
});

test('Search within Parfum category', async ({ landingPage }) => {
  await landingPage.searchInsidePerfumeCategory();
});
