const { test } = require("@playwright/test");
const { POManager } = require("../projectObject/POManager.js");
const { customTest } = require("../Utils/test-base.js");
const dataset = JSON.parse(
  JSON.stringify(require("../Utils/placeOrderTestData.json")),
);
test.describe.configure({ mode: "parallel" }); // it make the test in parallel for all the tests in file || it same like fullyParallel:true, but this is only for this file
// test.describe.configure({ mode: "serial" }); // if one test fail it skip the others
for (const data of dataset) {
  test(`@Web place order for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.email, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigationCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.MakeOrder(data.countryName);
    await orderReviewPage.verifyEmailID(data.email);
    await orderReviewPage.submitAndGetOrderID();

    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.MakeSureOrder();
  });
}
customTest(`test data fixtures`, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigationCart();

  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
}); // for fixtures
