const { expect } = require("@playwright/test");
class OrderHistoryPage {
  constructor(page) {
    this.page = page;
    this.orderID = this.page.locator(".em-spacer-1 .ng-star-inserted");
    this.orderIdDetails = page.locator(".col-text");
    this.ordersPage = this.page.locator("button[routerlink*='myorders']");
    this.body = this.page.locator("tbody");
    this.rows = this.page.locator("tbody tr");
  }
  async MakeSureOrder() {
    const orderId = await this.orderID.textContent();
    await this.ordersPage.click();
    await this.body.waitFor();
    for (let i = 0; i < (await this.rows.count()); ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await this.rows.nth(i).locator("button").first().click();
        break;
      }
    }
    const orderIdDetailsText = await this.orderIdDetails.textContent();
    expect(orderId.includes(orderIdDetailsText)).toBeTruthy();
  }
}
module.exports = { OrderHistoryPage };
