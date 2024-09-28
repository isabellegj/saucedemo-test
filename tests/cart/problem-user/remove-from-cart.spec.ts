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

productDataTestList.forEach((product) => {
  test.describe("Remove from cart problem_user tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);

      await loginPage.goto();
      await loginPage.login("problem_user", "secret_sauce");

      await inventoryPage.goto();
      await inventoryPage.addItemToCartByDataTest(product);
    });

    test(`Should remove ${product} from cart using the remove button`, async () => {
      await cartPage.goto();

      const cartItemsBeforeRemoval = await cartPage.getCartItems();
      expect(cartItemsBeforeRemoval).toContain(product);

      await cartPage.removeItemFromCartByDataTest(product);

      const cartItemsAfterRemoval = await cartPage.getCartItems();
      expect(cartItemsAfterRemoval).not.toContain(product);

      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(0);
    });
  });
});
