const { test, expect } = require("@playwright/test");
test("@Web Client App Test", async ({ page }) => {
  const email = "melsherbiny193@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");
  const productTitle = "ZARA COAT 3";
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Kakakaka123@");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body h5 b").last().waitFor();
  // await page.pause();
  // const allTitles = await page.locator(".card-body h5 b").allTextContents();
  // console.log(allTitles);
  const products = page.locator(".card-body");
  const countItem = await products.count();
  // console.log(countItem);
  for (let i = 0; i < countItem; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productTitle) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink='/dashboard/cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();

  await page.locator("[placeholder='Select Country']").pressSequentially("eg");
  const DropDown = page.locator("section.ta-results");
  await DropDown.waitFor();
  const countDrops = await DropDown.locator("button").count();

  for (let i = 0; i < countDrops; i++) {
    const text = await DropDown.locator("button").nth(i).textContent();
    if (text.trim() === "Egypt") {
      await DropDown.locator("button").nth(i).click();
      break;
    }
  }
  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  const productID = await page
    .locator("tr td label.ng-star-inserted")
    .textContent();
  console.log(productID);

  await page.locator("button[routerlink*='/myorders']").click();
  await page.locator("tbody").waitFor();
  const allRows = page.locator("tbody tr");
  for (let i = 0; i < (await allRows.count()); i++) {
    const rowProductID = await allRows.nth(i).locator("th").textContent();
    if (productID.includes(rowProductID)) {
      await allRows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderDetailsID = await page.locator("div.col-text").textContent();
  expect(productID.includes(orderDetailsID)).toBeTruthy();
});
// to make PR to pull request
