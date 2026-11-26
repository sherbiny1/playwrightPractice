const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "a login to ecommerce application with {string} and {string}",
  async function (username, password) {
    const loginPage = await this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  },
);

When("Add {string} to cart", async function (productName) {
  const dashboardPage = this.poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigationCart();
});

Then("Verify {string} is displayed in the cart", async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.verifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When(
  "Enter valid country {string} and make sure from {string} then place the order",
  async function (countryName, userName) {
    const orderReviewPage = await this.poManager.getOrderReviewPage();
    await orderReviewPage.MakeOrder(countryName);
    await orderReviewPage.verifyEmailID(userName);
    await orderReviewPage.submitAndGetOrderID();
  },
);

Then("Verify order is present in the orderHistory", async function () {
  const orderHistoryPage = await this.poManager.getOrderHistoryPage();
  await orderHistoryPage.MakeSureOrder();
});

Given(
  "a login to ecommerce2 application with {string} and {string}",
  async function (username, password) {
    const userName = this.page.locator("#username");
    const Password = this.page.locator("[type='password']");
    const signInBtn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(username);
    await Password.fill(password);
    await signInBtn.click();
  },
);

Then("Verify Error message is displayed", async function () {
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect",
  );
});
