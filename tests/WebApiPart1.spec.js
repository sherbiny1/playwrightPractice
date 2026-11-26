const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/Fixtures.js");
const loginPayLoad = {
  userEmail: "melsherbiny193@gmail.com",
  userPassword: "Kakakaka123@",
};
const createOrderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(createOrderPayLoad);
});

test("@Api Place The Order", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5 b").last().waitFor();
  await page.locator("button[routerlink*='/myorders']").click();
  await page.locator("tbody").waitFor();
  const allRows = page.locator("tbody tr");
  for (let i = 0; i < (await allRows.count()); i++) {
    const rowProductID = await allRows.nth(i).locator("th").textContent();
    if (response.orderID.includes(rowProductID)) {
      await allRows.nth(i).locator("button").first().click();
      break;
    }
  }
  await page.pause();
  const orderDetailsID = await page.locator("div.col-text").textContent();
  expect(response.orderID.includes(orderDetailsID)).toBeTruthy();
});

