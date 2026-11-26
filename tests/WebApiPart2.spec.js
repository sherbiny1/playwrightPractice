const { test, expect } = require("@playwright/test");
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const email = "melsherbiny193@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Kakakaka123@");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("@Api Client App Test", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const productTitle = "ZARA COAT 3";
  await page.locator(".card-body h5 b").last().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: productTitle })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText(productTitle)).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();

  await page.getByPlaceholder("Select Country").pressSequentially("eg");
  await page.getByRole("button", { name: "Egypt" }).click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});

test("Second App Test", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator(".card-body h5 b").last().waitFor();
  const titles = await page.locator(".card-body h5 b").allTextContents();
  console.log(titles);
});
