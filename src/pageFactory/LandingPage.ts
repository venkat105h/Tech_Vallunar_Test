import { Locator, Page, expect, BrowserContext } from '@playwright/test';
export class LandingPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly cookieAcceptBtn: Locator;
    readonly searchTxt: Locator;
    readonly productHeading: Locator;
    readonly productTile: Locator;
    readonly filtersSortTxt: Locator;
    readonly totalProducts: Locator;
    readonly loadMoreBtn: Locator;
    readonly perfumeBtn: Locator;
    readonly sortBtn: Locator;
    readonly priceOption: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.cookieAcceptBtn = page.getByTestId("uc-accept-all-button");
        this.perfumeBtn=page.getByRole('link', { name: /perfume|parfum/i }).first();
        this.productHeading = page.getByRole('heading', { level: 1 });
        this.searchTxt = page.getByRole('searchbox');
        this.productTile = page.locator('[data-testid="product-tile"]');
        this.filtersSortTxt = page.getByText(/filter|sort/i);
        this.totalProducts = page.locator('[data-testid="product-tile"]');
        this.loadMoreBtn = page.getByRole('button', { name: /load more/i });
        this.sortBtn=page.getByRole('button', { name: /sort/i });
        this.priceOption=page.getByRole('option', { name: /price.*low/i });
    }
    async acceptCookies() {
        await this.cookieAcceptBtn.waitFor({ "state": "visible", timeout: 50_000 });
        await this.cookieAcceptBtn.click();
    }

    async  applyFilter(criteria: string, option: string) {
        const filterSection = this.page.getByRole('button', { name: new RegExp(criteria, 'i') });
        await filterSection.scrollIntoViewIfNeeded();
        await filterSection.click();
        await this.page.getByPlaceholder("Marke suchen").fill(option);
        const filterOption = this.page.getByRole('checkbox', { name: new RegExp(option, 'i') }).first();
        await filterOption.scrollIntoViewIfNeeded();
        await filterOption.click();
    }

    async clickPerfumAndVerifyTitle() {
        await this.perfumeBtn.click();
        await expect(this.page).toHaveURL(/parfum|perfume/i);
    }

    async landingPageUIValidation() {
        await expect(this.productHeading).toBeVisible();
        await expect(this.productTile.first()).toBeVisible();
        await expect(this.filtersSortTxt).toBeVisible();
    }

    async validateProductListing(criteria: string, option: string){
        const products = this.page.locator('[data-testid="product-tile"]');
        await expect(products.first()).toBeVisible();
        console.log(
            `Filter Applied -> ${criteria}: ${option}, Products found: ${await products.count()}`
        );
    }
    async sortProducts(){
        await this.sortBtn.click();
        await this.priceOption.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.productTile.first()).toBeVisible();
    }

    async loadMorepaginationValidation(){
        const initialCount = await this.productTile.count();
        if (await this.loadMoreBtn.isVisible().catch(() => false)) {
            await this.loadMoreBtn.click();
            await this.page.waitForLoadState('networkidle');
            const newCount = await this.productTile.count();
            expect(newCount).toBeGreaterThan(initialCount);
        }
    }

    async searchInsidePerfumeCategory(){
        await this.searchTxt.fill('Dior');
        await this.searchTxt.press('Enter');
        await this.page.waitForLoadState('networkidle');
        await expect(this.productTile.first()).toBeVisible();
    }


}
