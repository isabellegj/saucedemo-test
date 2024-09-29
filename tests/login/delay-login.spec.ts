import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { InventoryPage } from "../../pages/InventoryPage";

test.describe("Delay login test", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test("Should check if login with performance_glitch_user is less than 5s", async () => {
    test.fail();
    const startTime = Date.now();

    await loginPage.login("performance_glitch_user", "secret_sauce");

    expect(inventoryPage.isInventoryPageVisible()).toBeTruthy();

    expect(await inventoryPage.isInventoryUrlCorrect());

    const endTime = Date.now();

    const loginTime = endTime - startTime;

    console.log(`Login after ${loginTime} ms`);

    expect(loginTime).toBeLessThan(5000);
  });
});
