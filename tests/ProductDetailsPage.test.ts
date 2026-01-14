import test from '../src/lib/BaseTest';
import ENV from "../src/lib/env";

test.beforeEach(async ({ page, landingPage }) => {
  await page.goto(ENV.baseURL, { waitUntil: 'domcontentloaded' });
  await landingPage.acceptCookies();
  await landingPage.clickPerfumAndVerifyTitle();
});

test('Open product detail page from listing', async ({ productDetailsPage }) => {
  await productDetailsPage.verifyProductDetails();
});

test('Add product to wishlist (guest user)', async ({ productDetailsPage }) => {
  await productDetailsPage.verifyWishListUI();
});

