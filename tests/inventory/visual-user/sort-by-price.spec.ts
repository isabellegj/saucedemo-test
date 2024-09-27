import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/LoginPage";
import { InventoryPage } from "../../../pages/InventoryPage";

test.describe("Sort by price visual_user tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("visual_user", "secret_sauce");
  });

  test("Should sort products by price in ascending order", async () => {
    await inventoryPage.selectSortOption("Price (low to high)");

    const sortedPrices = await inventoryPage.getProductPrices();
    const expectedPrices = [...sortedPrices].sort((a, b) => a - b);

    expect(sortedPrices).toEqual(expectedPrices);
  });

  test("Should sort products by price in descending order", async () => {
    await inventoryPage.selectSortOption("Price (high to low)");

    const sortedPrices = await inventoryPage.getProductPrices();
    const expectedPrices = [...sortedPrices].sort((a, b) => b - a);

    expect(sortedPrices).toEqual(expectedPrices);
  });
});
