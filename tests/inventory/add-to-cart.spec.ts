import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

const productList = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Fleece Jacket",
  "Sauce Labs Onesie",
  "Test.allTheThings() T-Shirt (Red)",
];

test.describe("Add to cart tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  productList.forEach((product, index) => {
    test(`Should add ${product} and verify in cart page`, async () => {
      await inventoryPage.addItemToCartByName(product);

      const itemCount = await inventoryPage.getCartItemCount();
      expect(itemCount).toBe(index + 1);

      await cartPage.goto();

      const cartItems = await cartPage.getCartItems();
      expect(cartItems).toContain(product);
    });
  });
});
