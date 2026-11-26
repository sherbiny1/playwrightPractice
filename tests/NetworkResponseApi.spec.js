const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/Fixtures.js");

const loginPayLoad = {
  userEmail: "melsherbiny193@gmail.com",
  userPassword: "Kakakaka123@",
};
const createOrderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(createOrderPayLoad);
});

test("network check response", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5 b").last().waitFor();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (routes) => {
      const body = JSON.stringify(fakePayLoadOrders);
      const response = await page.request.fetch(routes.request());
      routes.fulfill({
        body,
        response,
      });
    },
  );
  await page.locator("button[routerlink*='/myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  await expect(page.locator(".mt-4")).toContainText("You have No Orders");
});
