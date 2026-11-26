const { expect } = require("@playwright/test");
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = this.page.locator("div li").first();
    this.checkOut = this.page.locator("text=Checkout");
  }
  async verifyProductIsDisplayed(productName) {
    await this.cartProducts.waitFor();
    const bool = await this.getproductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }
  async Checkout() {
    await this.checkOut.click();
  }
  getproductLocator(productName) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}
module.exports = { CartPage };
