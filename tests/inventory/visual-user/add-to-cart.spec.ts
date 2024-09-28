import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";

const productDataTestList = [
  "sauce-labs-backpack",
  "sauce-labs-bike-light",
  "sauce-labs-bolt-t-shirt",
  "sauce-labs-fleece-jacket",
  "sauce-labs-onesie",
  "test.allthethings()-t-shirt-(red)",
];

test.describe("Add to cart visual_user tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login("visual_user", "secret_sauce");
  });

  productDataTestList.forEach((product) => {
    test(`Should add ${product} and verify in cart page`, async () => {
      await inventoryPage.addItemToCartByDataTest(product);

      const itemCount = await inventoryPage.getCartItemCount();
      expect(itemCount).toBe(1);

      await cartPage.goto();

      const cartItems = await cartPage.getCartItems();
      expect(cartItems).toContain(product);
    });
  });
});
