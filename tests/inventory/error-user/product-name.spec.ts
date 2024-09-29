import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";

const productDataTestList = [
  "Sauce Labs Backpack",
  "Sauce Labs Bike Light",
  "Sauce Labs Bolt T-Shirt",
  "Sauce Labs Fleece Jacket",
  "Sauce Labs Onesie",
  "Test.allthethings() T-Shirt (Red)",
];

test.describe("Product name error_user tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("error_user", "secret_sauce");
  });

  productDataTestList.forEach((product) => {
    test(`Should check if ${product} name is correct`, async () => {
      await inventoryPage.goto();

      await expect(product.slice(0, 10)).toBe("Sauce Labs");
    });
  });
});
