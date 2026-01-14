import { Locator, Page, expect, BrowserContext } from '@playwright/test';
export class ProductDetailsPage  {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly firstProduct: Locator;
    readonly addToCartBtn: Locator;
    readonly wishListIcon: Locator;
    readonly cartDialog: Locator;
    readonly products: Locator;
    readonly clearAllFiltersBtn: Locator;
    readonly sortBtn: Locator;
    readonly priceOption: Locator;
   
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.firstProduct= page.locator('[data-testid="product-tile"]');
        this.addToCartBtn= page.getByRole('button', { name: /add to basket|add to cart/i });
        this.wishListIcon= page.locator('[data-testid="product-tile"]').first().locator('[aria-label*="wishlist"]');
        this.cartDialog= page.getByRole('dialog');
        this.products = page.locator('[data-testid="product-tile"]');
        this.clearAllFiltersBtn=page.getByRole('button', { name: /clear all|reset/i });
        this.sortBtn=page.getByRole('button', { name: /sort/i });
        this.priceOption=page.getByRole('option', { name: /price.*low/i });
    }

    async verifyProductDetails(){
        await this.firstProduct.click();
        await expect(this.page).toHaveURL(/product|p\//i);
        await expect(this.addToCartBtn).toBeVisible();
    }

    async verifyWishListUI(){
        await this.wishListIcon.click();
        await expect(this.cartDialog).toBeVisible();
    }



}
