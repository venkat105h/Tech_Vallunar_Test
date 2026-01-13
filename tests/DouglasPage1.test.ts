import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.douglas.de/de';

async function acceptCookies(page: Page) {
  await page.getByTestId("uc-accept-all-button").waitFor({"state":"visible",timeout:50_000})
  const btn = page.getByTestId("uc-accept-all-button");
  if (await btn.isVisible().catch(() => false)) {
    await btn.click();
  }
}

async function goToParfum(page: Page) {
  await page.getByRole('link', { name: /perfume|parfum/i }).first().click();
  await expect(page).toHaveURL(/parfum|perfume/i);
}

test.describe('Douglas – Additional Parfum Test Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await acceptCookies(page);
    await goToParfum(page);
  });

  test('Verify Parfum landing page UI', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('[data-testid="product-tile"]').first()).toBeVisible();
    await expect(page.getByText(/filter|sort/i)).toBeVisible();
  });

  test('Apply multiple filters together', async ({ page }) => {
    await page.getByRole('button', { name: /brand/i }).click();
    await page.getByRole('checkbox', { name: /dior/i }).check();
    await page.getByRole('button', { name: /for whom|gender/i }).click();
    await page.getByRole('checkbox', { name: /women/i }).check();
    await page.waitForLoadState('networkidle');
    const products = page.locator('[data-testid="product-tile"]');
    await expect(products.first()).toBeVisible();
    expect(await products.count()).toBeGreaterThan(0);
  });

  test('Clear all applied filters', async ({ page }) => {
    await page.getByRole('button', { name: /brand/i }).click();
    await page.getByRole('checkbox', { name: /dior/i }).check();
    const clearBtn = page.getByRole('button', { name: /clear all|reset/i });
    await clearBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="product-tile"]').first()).toBeVisible();
  });

  test('Sort products by price (Low to High)', async ({ page }) => {
    await page.getByRole('button', { name: /sort/i }).click();
    await page.getByRole('option', { name: /price.*low/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="product-tile"]').first()).toBeVisible();
  });

  test('Open product detail page from listing', async ({ page }) => {
    const firstProduct = page.locator('[data-testid="product-tile"]').first();
    await firstProduct.click();
    await expect(page).toHaveURL(/product|p\//i);
    await expect(page.getByRole('button', { name: /add to basket|add to cart/i })).toBeVisible();
  });

  test('Add product to wishlist (guest user)', async ({ page }) => {
    const wishlistIcon = page
      .locator('[data-testid="product-tile"]')
      .first()
      .locator('[aria-label*="wishlist"]');
    await wishlistIcon.click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('Load more / pagination works', async ({ page }) => {
    const initialCount = await page.locator('[data-testid="product-tile"]').count();
    const loadMoreBtn = page.getByRole('button', { name: /load more/i });
    if (await loadMoreBtn.isVisible().catch(() => false)) {
      await loadMoreBtn.click();
      await page.waitForLoadState('networkidle');
      const newCount = await page.locator('[data-testid="product-tile"]').count();
      expect(newCount).toBeGreaterThan(initialCount);
    }
  });

  test('Search within Parfum category', async ({ page }) => {
    const searchBox = page.getByRole('searchbox');
    await searchBox.fill('Dior');
    await searchBox.press('Enter');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="product-tile"]').first()).toBeVisible();
  });

});
