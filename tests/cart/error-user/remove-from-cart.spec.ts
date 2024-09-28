import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";

const productList = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Fleece Jacket",
  "Sauce Labs Onesie",
  "Test.allTheThings() T-Shirt (Red)",
];

productList.forEach((product) => {
  test.describe("Remove from cart error_user tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);

      await loginPage.goto();
      await loginPage.login("error_user", "secret_sauce");

      await inventoryPage.goto();
      await inventoryPage.addItemToCartByName(product);
    });

    test(`Should remove ${product} from cart using the remove button`, async () => {
      await cartPage.goto();

      const cartItemsBeforeRemoval = await cartPage.getCartItems();
      expect(cartItemsBeforeRemoval).toContain(product);

      await cartPage.removeItemByName(product);

      const cartItemsAfterRemoval = await cartPage.getCartItems();
      expect(cartItemsAfterRemoval).not.toContain(product);

      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(0);
    });
  });
});
