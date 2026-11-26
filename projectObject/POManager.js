const { LoginPage } = require("./LoginPage.js");
const { DashboardPage } = require("./DashboardPage.js");
const { CartPage } = require("./CartPage.js");
const { OrderReviewPage } = require("./OrderReviewPage.js");
const { OrderHistoryPage } = require("./OrderHistoryPage.js");
class POManager {
  constructor(page) {
    this.page = page;
    this.LoginPage = new LoginPage(this.page);
    this.DashboardPage = new DashboardPage(this.page);
    this.CartPage = new CartPage(this.page);
    this.OrderReviewPage = new OrderReviewPage(this.page);
    this.OrderHistoryPage = new OrderHistoryPage(this.page);
  }
  getLoginPage() {
    return this.LoginPage;
  }
  getDashboardPage() {
    return this.DashboardPage;
  }
  getCartPage() {
    return this.CartPage;
  }
  getOrderReviewPage() {
    return this.OrderReviewPage;
  }
  getOrderHistoryPage() {
    return this.OrderHistoryPage;
  }
}
module.exports = { POManager };
