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

test.describe("Remove from cart visual_user tests", () => {
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

  productList.forEach((product) => {
    test(`Should remove ${product} from cart`, async () => {
      await inventoryPage.addItemToCartByName(product);

      await inventoryPage.goto();

      await inventoryPage.removeItemFromCartByName(product);

      await cartPage.goto();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(0);
    });
  });
});
