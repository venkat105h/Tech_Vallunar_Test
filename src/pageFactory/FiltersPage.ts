import { Locator, Page, expect, BrowserContext } from '@playwright/test';
export class FiltersPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly brandBtn: Locator;
    readonly itemChkBox: Locator;
    readonly genderBtn: Locator;
    readonly femaleCheckBox: Locator;
    readonly products: Locator;
    readonly clearAllFiltersBtn: Locator;
    readonly sortBtn: Locator;
    readonly priceOption: Locator;
   
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.brandBtn= page.getByRole('button', { name: /brand/i });
        this.itemChkBox= page.getByRole('checkbox', { name: /dior/i });
        this.genderBtn= page.getByRole('button', { name: /for whom|gender/i });
        this.femaleCheckBox= page.getByRole('checkbox', { name: /women/i });
        this.products = page.locator('[data-testid="product-tile"]');
        this.clearAllFiltersBtn=page.getByRole('button', { name: /clear all|reset/i });
        this.sortBtn=page.getByRole('button', { name: /sort/i });
        this.priceOption=page.getByRole('option', { name: /price.*low/i });
    }

    async applyMultipleFilters() {
        await this.brandBtn.click();
        await this.itemChkBox.check();
        await this.genderBtn.click();
        await this.femaleCheckBox.check();
        await this.page.waitForLoadState('networkidle');
        await expect(this.products.first()).toBeVisible();
        expect(await this.products.count()).toBeGreaterThan(0);  
    }
    async clearAllFilters() {
        await this.brandBtn.click();
        await this.itemChkBox.check();
        await this.clearAllFiltersBtn.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.products.first()).toBeVisible();
        
    }


}
