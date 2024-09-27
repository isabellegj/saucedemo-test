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
    const cartBadge = this.page.locator(".shopping_cart_badge");
    const itemCount = await cartBadge.innerText();
    return parseInt(itemCount) || 0;
  }

  async selectSortOption(option: string) {
    const sortSelector = ".product_sort_container";
    await this.page.selectOption(sortSelector, option);
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page
      .locator(".inventory_item_price")
      .all();
    const prices = await Promise.all(
      priceElements.map(async (element) => {
        const priceText = await element.innerText();
        return parseFloat(priceText.replace("$", "").trim());
      })
    );
    return prices;
  }

  async getProductNames(): Promise<string[]> {
    const nameElements = await this.page.locator(".inventory_item_name").all();
    const productNames = await Promise.all(
      nameElements.map(async (element) => {
        return await element.innerText();
      })
    );
    return productNames;
  }
}
