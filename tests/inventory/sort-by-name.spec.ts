import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

test.describe("Sorting by name tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  const productNames = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
  ];

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Should sort products by name in alphabetical order (A to Z)", async () => {
    await inventoryPage.selectSortOption("Name (A to Z)");

    const sortedProductNames = await inventoryPage.getProductNames();

    const expectedSortedProductNames = [...productNames].sort();
    expect(sortedProductNames).toEqual(expectedSortedProductNames);
  });

  test("Should sort products by name in reverse alphabetical order (Z to A)", async () => {
    await inventoryPage.selectSortOption("Name (Z to A)");

    const sortedProductNames = await inventoryPage.getProductNames();

    const expectedSortedProductNames = [...productNames].sort().reverse();
    expect(sortedProductNames).toEqual(expectedSortedProductNames);
  });
});
