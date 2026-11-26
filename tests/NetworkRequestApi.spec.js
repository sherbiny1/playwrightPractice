const { test, expect } = require("@playwright/test");

test("Network request API", async ({ page }) => {
  const email = "melsherbiny193@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Kakakaka123@");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5 b").last().waitFor();
  await page.locator("button[routerlink*='/myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (routes) => {
      routes.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6af3928592a4341c4c1054f1",
      });
    },
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p.blink_me")).toContainText(
    "You are not authorize",
  );
});
