import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

const successfullyUsersList = [
  "standard_user",
  "problem_user",
  "error_user",
  "visual_user",
];

test.describe("Login tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  successfullyUsersList.forEach((user) => {
    test(`Should login successfully with user ${user}`, async () => {
      await loginPage.login(user, "secret_sauce");

      expect(await inventoryPage.isInventoryUrlCorrect());

      expect(await inventoryPage.isInventoryPageVisible()).toBeTruthy();
    });
  });
});
