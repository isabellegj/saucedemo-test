import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";

test.describe("Continue Shopping button standard_user tests", () => {
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
    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
  });

  test("Should redirect to inventory page when continue shopping is clicked", async () => {
    await cartPage.goto();

    await cartPage.page.click('[data-test="continue-shopping"]');

    expect(cartPage.page.url()).toBe(
      "https://www.saucedemo.com/inventory.html"
    );

    const isInventoryPageVisible = await inventoryPage.isInventoryPageVisible();
    expect(isInventoryPageVisible).toBe(true);
  });
});
