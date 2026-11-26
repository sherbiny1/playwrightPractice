const { expect } = require("@playwright/test");
const { customTest } = require("../Utils/Fixtures.js");


customTest(
  "Fixture Test",
  async ({ authenticationPage, createOrder, testDataForLog }) => {
    await authenticationPage.goto("https://rahulshettyacademy.com/client");
    await authenticationPage.locator("button[routerlink*='/myorders']").click();
    await authenticationPage.locator("tbody").waitFor();
    await expect(
      authenticationPage.getByText(createOrder.orderID),
    ).toBeVisible();
    console.log(testDataForLog.productName);
  },
);
