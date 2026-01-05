import { test as base } from '@playwright/test';

//replace with export of page with locators

import { DouglasPage } from '../pageFactory/DouglasPage';

//replase with POM classes
const test = base.extend<{
    douglasPage: DouglasPage;
      
}>({
    douglasPage: async ({ page, context }, use) => {
        await use(new DouglasPage(page, context));
    } 
})

export default test;
export const expect = test.expect;
