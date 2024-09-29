import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";

const productDataTestList = [
  "sauce-labs-backpack",
  "sauce-labs-bike-light",
  "sauce-labs-bolt-t-shirt",
  "sauce-labs-fleece-jacket",
  "sauce-labs-onesie",
  "test.allthethings()-t-shirt-(red)",
];

test.describe("Product image error_user tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("error_user", "secret_sauce");
  });

  productDataTestList.forEach((product) => {
    test(`Should check if ${product} image is correct`, async () => {
      await inventoryPage.goto();

      const src = await inventoryPage.getProductImageSrc(product);

      expect(src).not.toBe("/static/media/sl-404.168b1cce.jpg");
      expect(src).toContain(".jpg");
    });
  });
});
