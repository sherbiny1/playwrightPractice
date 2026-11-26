const { test, expect } = require("@playwright/test");

test("@Web Automation practice on child page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://www.google.com/");
  //   await page.goBack();
  //   await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  await page.pause();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();

  const iframePage = page.frameLocator("#courses-iframe");
  await iframePage.locator("li a[href*='lifetime-access']:visible").click();
  const textAccessPlan = await iframePage.locator(".text h2").textContent();
  console.log(textAccessPlan.split(" ")[1]);
});

test("screenshot test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "beforeHideLocator.png" });
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.screenshot({ path: "afterHideLocator.png" });
});

test("visual training", async ({ page }) => {
  await page.goto("https://www.google.com/");
  expect(await page.screenshot()).toMatchSnapshot("googlePage.png");
});
