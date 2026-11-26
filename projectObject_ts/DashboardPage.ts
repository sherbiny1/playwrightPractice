import {Page,Locator} from "@playwright/test"
export class DashboardPage {
  products:Locator
  productsTitle:Locator
  cart:Locator
  constructor(page:Page) {
    this.products = page.locator(".card-body");
    this.productsTitle = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }
  async searchProductAddCart(productName:string) {
    const titles = await this.productsTitle.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async navigationCart() {
    await this.cart.click();
  }
}
