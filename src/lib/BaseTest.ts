import { test as base } from '@playwright/test';
import { LandingPage } from '../pageFactory/LandingPage';
import { FiltersPage } from '../pageFactory/FiltersPage';
import { ProductDetailsPage } from '../pageFactory/ProductDetailsPage';

const test = base.extend<{
    landingPage: LandingPage;
    filtersPage: FiltersPage;
    productDetailsPage: ProductDetailsPage;

      
}>({
    landingPage: async ({ page, context }, use) => {
        await use(new LandingPage(page, context));
    },
    filtersPage: async ({ page, context }, use) => {
        await use(new FiltersPage(page, context));
    },
    productDetailsPage: async ({ page, context }, use) => {
        await use(new ProductDetailsPage(page, context));
    }
})

export default test;
export const expect = test.expect;
