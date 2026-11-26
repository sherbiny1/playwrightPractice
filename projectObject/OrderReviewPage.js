const { expect } = require("@playwright/test");
class OrderReviewPage {
  constructor(page) {
    this.page = page;
    this.Country = this.page.locator("[placeholder*='Country']");
    this.dropdown = this.page.locator(".ta-results");
    this.emailID = this.page.locator(".user__name [type='text']").first();
    this.submitBtn = this.page.locator(".action__submit");
    this.orderID = this.page.locator(".em-spacer-1 .ng-star-inserted");
    this.orderConfirmationText = this.page.locator(".hero-primary");
  }
  async MakeOrder(countryName) {
    await this.Country.pressSequentially("eg");
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }
  async verifyEmailID(email) {
    expect(this.emailID).toHaveText(email);
  }
  async submitAndGetOrderID() {
    await this.submitBtn.click();
    await expect(this.orderConfirmationText).toHaveText(
      " Thankyou for the order. ",
    );
    const orderId = await this.orderID.textContent();
    console.log(orderId);
  }
}
module.exports = { OrderReviewPage };
