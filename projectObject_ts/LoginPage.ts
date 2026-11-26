import {Page,Locator} from "@playwright/test"
export class LoginPage {
  page:Page
  userName:Locator
  password:Locator
  signInBtn:Locator
  constructor(page:Page) {
    this.page = page;
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.signInBtn = page.locator("#login");
  }
  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
  async validLogin(username:string, password:string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInBtn.click();
    await this.page.waitForLoadState("networkidle");
  }
}
