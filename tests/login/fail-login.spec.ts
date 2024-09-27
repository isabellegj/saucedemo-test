import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

const failUsersList = ["locked_out_user", "any_user", "user"];

test.describe("Login tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  failUsersList.forEach((user) => {
    test(`Should fail to login with user ${user}`, async () => {
      await loginPage.login(user, "secret_sauce");
      const errorMessage = await loginPage.getErrorMessage();
      expect(
        errorMessage?.includes(
          "Epic sadface: Username and password do not match any user in this service"
        ) ||
          errorMessage?.includes(
            "Epic sadface: Sorry, this user has been locked out."
          )
      ).toBeTruthy();
    });
  });
});
