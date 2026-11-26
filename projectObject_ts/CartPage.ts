import {expect,Page,Locator} from "@playwright/test"
export class CartPage {
  page:Page
  cartProducts:Locator
  checkOut:Locator
  constructor(page:Page) {
    this.page = page;
    this.cartProducts = this.page.locator("div li").first();
    this.checkOut = this.page.locator("text=Checkout");
  }
  async verifyProductIsDisplayed(productName:string) {
    await this.cartProducts.waitFor();
    const bool = await this.getproductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }
  async Checkout() {
    await this.checkOut.click();
  }
  getproductLocator(productName:string) {
    return this.page.locator("h3:has-text('" + productName + "')");
  }
}