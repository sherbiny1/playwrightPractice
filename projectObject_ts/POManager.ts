import { LoginPage } from "./LoginPage.ts";
import { DashboardPage } from "./DashboardPage.ts";
import { CartPage } from "./CartPage.ts";
import { OrderReviewPage } from "./OrderReviewPage.ts";
import { OrderHistoryPage } from "./OrderHistoryPage.ts";
import {Page} from "@playwright/test"
 export class POManager {
  page:Page;
  loginPage:LoginPage
  dashboardPage:DashboardPage
  cartPage:CartPage
  orderReviewPage:OrderReviewPage
  orderHistoryPage:OrderHistoryPage
  constructor(page:Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.orderReviewPage = new OrderReviewPage(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getCartPage() {
    return this.cartPage;
  }
  getOrderReviewPage() {
    return this.orderReviewPage;
  }
  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }
}
