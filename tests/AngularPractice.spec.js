const { test, expect } = require("@playwright/test");

test("AngularPractice Working on", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("aAhmed123");
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();
  await expect(
    page.getByText("Success! The Form has been submitted successfully!."),
  ).toBeVisible({ timeout: 9000 }); // step timeout
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});

// test("AngularPractice with test timoeut", async ({ page }) => {
//   test.setTimeout(60000); // Overrides timeout for test
// // inline > configure > global
// page.setDefaultTimeout(10000) //  ACTION Timeout
//   const expecTest = expect.configure({ timeout: 9000 }); // to make timeout only for test
//   await page.goto("https://rahulshettyacademy.com/angularpractice/");
//   await page.getByLabel("Check me out if you Love IceCreams!").click();
//   await page.getByLabel("Employed").check();
//   await page.getByLabel("Gender").selectOption("Female");
//   await page.getByPlaceholder("Password").fill("aAhmed123");
//   await page.getByRole("button", { name: "Submit" }).click();
//   await page
//     .getByText("Success! The Form has been submitted successfully!.")
//     .isVisible();
//   await expecTest(
//     page.getByText("Success! The Form has been submitted successfully!."),
//   ).toBeVisible({ timeout: 9000 }); // step timeout
//   await page.getByRole("link", { name: "Shop" }).click();
//   await expecTest(page.locator("h1.my-4")).toHaveText(
//     "Shop" /*{ timeout: 9500 }*/,
//   ); // to make timout for step and we change it with test timout
//   await page
//     .locator("app-card")
//     .filter({ hasText: "Nokia Edge" })
//     .getByRole("button")
//     .click();
// });
