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

test.describe("Add to cart problem_user tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login("problem_user", "secret_sauce");
  });

  productDataTestList.forEach((product) => {
    test(`Should add ${product.name} and verify in cart page`, async () => {
      await inventoryPage.addItemToCartByDataTest(product.dataTest);

      const itemCount = await inventoryPage.getCartItemCount();
      expect(itemCount).toBe(1);

      await cartPage.goto();

      const cartItems = await cartPage.getCartItems();
      expect(cartItems).toContain(product.name);
    });
  });
});
