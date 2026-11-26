const { Before, AfterStep, BeforeAll } = require("@cucumber/cucumber");
const { POManager } = require("../../projectObject/POManager.js");
const playwright = require("@playwright/test");

Before(
  /*{ tags: "@foo" },*/ async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
  },
);

BeforeAll(async function () {
  console.log("Start the test bew");
});

AfterStep(async function ({ result }) {
  if (result.status === result.Failed) {
    await this.page.screenshot({ path: "afterstepFail.png" });
  }
});
