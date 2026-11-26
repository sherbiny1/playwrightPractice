const base = require("@playwright/test");
const { request } = require("@playwright/test");
const { default: ApiUtils } = require("./ApiUtils.js");
const loginPayLoad = {
  userEmail: "melsherbiny193@gmail.com",
  userPassword: "Kakakaka123@",
};
const createOrderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

exports.customTest = base.test.extend({
  authenticationPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "melsherbiny193@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Kakakaka123@");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle");
    await use(page);
    await context.close();
  },
  createOrder: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    const response = await apiUtils.createOrder(createOrderPayLoad);
    await use(response);
    await apiContext.dispose();
  },
  testDataForLog: {
    productName: "Adidas kls",
  },
});
