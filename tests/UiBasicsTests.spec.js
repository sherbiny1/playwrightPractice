const { test, expect } = require("@playwright/test");

test("Browser playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body .card-title a");
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.status(), response.url()),
  );

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("Mohammed");
  await password.fill("learning");
  await signInBtn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  ///////////////

  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await signInBtn.click();
  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(0).textContent());
  // console.log(await cardTitles.nth(1).textContent());
  console.log(await cardTitles.allTextContents());

  // await cardTitles.first().textContent();
  // await cardTitles.nth(0).textContent();
  // await cardTitles.nth(1).textContent();
});

// test.only("Page playwright test", async ({ page }) => {
//   await page.goto("https://google.com");
// }); => it make this test only and skip the others

// test("Page playwright test", async ({ page }) => {
//   await page.goto("https://google.com");
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// });

// test("UI controls", async ({ page }) => {
//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//   const documentLink = page.locator("[href*='documents-request']");
//   //DropDown
//   const DropDown = page.locator("select.form-control");
//   await DropDown.selectOption("teach");

//   //Radio
//   await page.locator("span.radiotextsty").last().click();
//   await page.locator("#okayBtn").click();
//   console.log(await page.locator("span.radiotextsty").last().isChecked());
//   await expect(page.locator("span.radiotextsty").last()).toBeChecked();
//   //Checkbox
//   await page.locator("#terms").click();
//   await expect(page.locator("#terms")).toBeChecked();
//   await page.locator("#terms").uncheck();
//   expect(await page.locator("#terms").isChecked()).toBeFalsy();
//   //BlindLink
//   await expect(documentLink).toHaveAttribute("class", "blinkingText");

//   // page.pause();

//   // instead of textContent() use inputValue()
//   // console.log(await page.locator("#username").inputValue());
// });

// test("@ Child window", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//   const documentLink = page.locator("[href*='documents-request']");
//   const userName = page.locator("#username");
//   const [newPage] = await Promise.all([
//     context.waitForEvent("page"),
//     documentLink.click(),
//   ]);
//   const text = await newPage.locator(".red").textContent();
//   const splitText = text.split("@")[1];
//   const email = splitText.split(" ")[0];
//   await userName.fill(email);
//   console.log(await userName.inputValue());
//   // await page.pause();
// });
