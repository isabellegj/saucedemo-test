import { Page } from "@playwright/test";

export class CheckoutPage {
  private page: Page;

  private checkoutContainer = '[data-test="checkout-info-container"]';

  constructor(page: Page) {
    this.page = page;
  }

  async isCheckoutPageVisible(): Promise<boolean> {
    return await this.page.isVisible(this.checkoutContainer);
  }
}
