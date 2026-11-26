class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.signInBtn = page.locator("#login");
  }
  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
  async validLogin(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInBtn.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { LoginPage };
