import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';
  private errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}
