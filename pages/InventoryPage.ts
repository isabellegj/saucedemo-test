import { expect, Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  private inventoryContainer = ".inventory_list";

  constructor(page: Page) {
    this.page = page;
  }

  async isInventoryPageVisible() {
    return await this.page.isVisible(this.inventoryContainer);
  }

  async isInventoryUrlCorrect() {
    return expect(this.page.url()).toBe(
      "https://www.saucedemo.com/inventory.html"
    );
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async addItemToCartByDataTest(itemDataTest: string) {
    const itemSelector = `[data-test="add-to-cart-${itemDataTest}"]`;
    await this.page.click(itemSelector);
  }

  async removeItemFromCartByDataTest(itemDataTest: string) {
    const itemSelector = `[data-test="remove-${itemDataTest}"]`;
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
    const titleList = await this.page.locator(".inventory_item_name");
    const productTitle = await titleList.allTextContents();
    return productTitle;
  }

  async getProductImageSrc(itemDataTest: string) {
    const imageSelector = this.page.locator(
      `img[data-test="inventory-item-${itemDataTest}-img"]`
    );

    const imageSrc = await imageSelector.getAttribute("src");
  }
}
