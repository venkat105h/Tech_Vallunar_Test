import { Locator, Page, expect, BrowserContext } from '@playwright/test';
export class DouglasPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly cookieAcceptBtn: Locator;
   
    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.cookieAcceptBtn =page.getByTestId("uc-accept-all-button")
    }
    
    // Reusable cookie handler
    async acceptCookies() {
        await this.cookieAcceptBtn.waitFor({"state":"visible",timeout:50_000});
        await this.cookieAcceptBtn.click();
    }

    // Reusable filter applier
    async  applyFilter(criteria: string, option: string) {
        // Expand filter section
        const filterSection = this.page.getByRole('button', { name: new RegExp(criteria, 'i') });
        await filterSection.scrollIntoViewIfNeeded();
        await filterSection.click();
        // Type item
        await this.page.getByPlaceholder("Marke suchen").fill(option);
        // Select filter option
        const filterOption = this.page.getByRole('checkbox', { name: new RegExp(option, 'i') }).first();
        await filterOption.scrollIntoViewIfNeeded();
        await filterOption.click();
    }

    async clickPerfumAndVerifyTitle() {
        // Click "Parfum"
        await this.page.locator("//a[@id='navigation-main-entry-2']").click();
        await this.page.pause()

    }
    async validateProductListing(criteria:string,option:string){
        // Validate product listing
      const products = this.page.locator('[data-testid="product-tile"]');
      await expect(products.first()).toBeVisible();

      console.log(
        `Filter Applied -> ${criteria}: ${option}, Products found: ${await products.count()}`
      );
    }
}
