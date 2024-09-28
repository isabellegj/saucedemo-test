import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";
import { CartPage } from "../../../pages/CartPage";
import { CheckoutPage } from "../../../pages/CheckoutPage";

test.describe("Checkout button visual_user test", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login("visual_user", "secret_sauce");

    await inventoryPage.addItemToCartByName("Sauce Labs Backpack");
  });

  test("Should navigate to checkout page when checkout button is clicked", async () => {
    await cartPage.goto();

    await cartPage.checkoutClick();

    const isCheckoutPageVisible = await checkoutPage.isCheckoutPageVisible();
    expect(isCheckoutPageVisible).toBe(true);
  });
});
