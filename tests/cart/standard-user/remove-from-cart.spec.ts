import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";

const productDataTestList = [
  {
    name: "Sauce Labs Backpack",
    dataTest: "sauce-labs-backpack",
  },
  {
    name: "Sauce Labs Bike Light",
    dataTest: "sauce-labs-bike-light",
  },
  {
    name: "Sauce Labs Bolt T-Shirt",
    dataTest: "sauce-labs-bolt-t-shirt",
  },
  {
    name: "Sauce Labs Fleece Jacket",
    dataTest: "sauce-labs-fleece-jacket",
  },
  {
    name: "Sauce Labs Onesie",
    dataTest: "sauce-labs-onesie",
  },
  {
    name: "Test.allTheThings() T-Shirt (Red)",
    dataTest: "test.allthethings()-t-shirt-(red)",
  },
];
productDataTestList.forEach((product) => {
  test.describe("Remove from cart standard_user tests", () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      inventoryPage = new InventoryPage(page);
      cartPage = new CartPage(page);

      await loginPage.goto();
      await loginPage.login("standard_user", "secret_sauce");

      await inventoryPage.goto();
      await inventoryPage.addItemToCartByDataTest(product.dataTest);
    });

    test(`Should remove ${product.name} from cart using the remove button`, async () => {
      await cartPage.goto();

      const cartItemsBeforeRemoval = await cartPage.getCartItems();
      expect(cartItemsBeforeRemoval).toContain(product.name);

      await cartPage.removeItemFromCartByDataTest(product.dataTest);

      const cartItemsAfterRemoval = await cartPage.getCartItems();
      expect(cartItemsAfterRemoval).not.toContain(product.name);

      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(0);
    });
  });
});
