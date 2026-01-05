import test from '../src/lib/BaseTest';
import ENV from "../src/lib/env";
// Data-driven filter criteria
const filterData = [
  //{ criteria: 'Highlights', option: 'Neuheiten' },
  { criteria: 'Marke', option: 'Dior' },
  //{ criteria: 'Produktart', option: 'Eau de Parfum' },
  //{ criteria: 'Sale', option: 'Sale' },
  //{ criteria: 'Geschenk für', option: 'Für Sie' },
  //{ criteria: 'Für Wen', option: 'Damen' },
  //{ criteria: 'Neu', option: 'Neu' },
  //{ criteria: 'Limitiert', option: 'Limitiert' }
];

test.describe('Douglas Parfum – Data Driven Filters @filter', () => {

  test.beforeEach(async ({ page,douglasPage}) => {
    await page.goto(ENV.baseURL, { waitUntil: 'domcontentloaded' });
    await douglasPage.acceptCookies();
    //await douglasPage.clickPerfumAndVerifyTitle();
  })
   
  for (const data of filterData) {
    test(`Apply filter: ${data.criteria} → ${data.option}`, async ({ page,douglasPage }) => {

      await douglasPage.applyFilter(data.criteria, data.option);

      // Wait for results refresh
      await page.waitForLoadState('networkidle');
      await douglasPage.validateProductListing(data.criteria,data.option);
    });
  }
});