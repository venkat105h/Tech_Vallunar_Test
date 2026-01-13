import test from '../src/lib/BaseTest';
import ENV from "../src/lib/env";
const filterData = [
 
  { criteria: 'Marke', option: 'Dior' }
];

test.describe.skip('Douglas Parfum – Data Driven Filters @filter', () => {

  test.beforeEach(async ({ page,douglasPage}) => {
    await page.goto(ENV.baseURL, { waitUntil: 'domcontentloaded' });
    await douglasPage.acceptCookies();
  })
   
  for (const data of filterData) {
    test(`Apply filter: ${data.criteria} → ${data.option}`, async ({douglasPage }) => {
      await douglasPage.applyFilter(data.criteria, data.option);
      await douglasPage.validateProductListing(data.criteria,data.option);
    });
  }
});