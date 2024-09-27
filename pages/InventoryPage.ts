import { Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  private inventoryContainer = ".inventory_list";

  constructor(page: Page) {
    this.page = page;
  }

  async isInventoryPageVisible() {
    return await this.page.isVisible(this.inventoryContainer);
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async addItemToCartByName(itemName: string) {
    const itemSelector = `//*[contains(text(), "${itemName}")]/ancestor::div[@class="inventory_item"]//button[text()="Add to cart"]`;
    await this.page.click(itemSelector);
  }

  async removeItemFromCartByName(itemName: string) {
    const itemSelector = `//*[contains(text(), "${itemName}")]/ancestor::div[@class="inventory_item"]//button[text()="Remove"]`;
    await this.page.click(itemSelector);
  }

  async getCartItemCount(): Promise<number> {
    const cartBadge = await this.page.locator(".shopping_cart_badge");
    const itemCount = await cartBadge.innerText();
    return parseInt(itemCount) || 0;
  }
}
