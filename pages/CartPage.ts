import { Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/cart.html");
  }

  async getCartItemCount(): Promise<number> {
    const cartItems = await this.page.$$(".cart_item");
    return cartItems.length;
  }

  async removeItemFromCartByDataTest(itemDataTest: string) {
    const itemSelector = `[data-test="remove-${itemDataTest}"]`;
    await this.page.click(itemSelector);
  }

  async getCartItems(): Promise<string[]> {
    const items = await this.page.$$eval(".inventory_item_name", (elements) =>
      elements.map((el) => el.textContent?.trim() || "")
    );
    return items;
  }

  async isCartPageVisible(): Promise<boolean> {
    return await this.page.isVisible(".cart_contents_container");
  }

  async checkoutClick() {
    await this.page.click('[data-test="checkout"]');
  }
}
