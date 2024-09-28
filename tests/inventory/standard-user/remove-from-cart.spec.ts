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
  });

  productDataTestList.forEach((product) => {
    test(`Should remove ${product} from cart`, async () => {
      await inventoryPage.addItemToCartByDataTest(product);

      await inventoryPage.goto();

      await inventoryPage.removeItemFromCartByDataTest(product);

      await cartPage.goto();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(0);
    });
  });
});
