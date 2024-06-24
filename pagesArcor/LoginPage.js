require('dotenv').config();
const { expect } = require('@playwright/test');
const { timeout, name } = require('../playwright.config');
class LoginPage {

    constructor(page) {
        //Data
        this.page = page;
        this.Url = process.env.URL;
        this.user_email = process.env.USER_EMAIL;
        this.user_password = process.env.PASSWORD;
        this.user_name = process.env.USER_NAME;
        //Locators
        this.login = page.locator('span.mco-my-account-menu_login:has-text("Ingresar")').first();
        this.continueButtonArcorMain = page.locator('a[href="https://arcorencasa.com/"]:has-text("Creemos Momentos")');
        this.userLoginData = page.locator('#mco_input_user_login');
        this.userPasswordLoginData = page.locator('input#mco_input_user_password');
        this.buttonLogin = page.locator('#mco_login_btn');
        this.assertAddress = page.getByRole('heading', { name: '¿Dónde enviamos tu pedido?' });
        this.buttonGoToShop = page.locator('button#mcoBtnSelectAddress');
    }

    async goToArcor() {
        await this.page.goto(this.Url);
        await this.page.waitForLoadState('domcontentloaded');
    };

    async setUserAndPasswordLogin() {

        await this.continueButtonArcorMain.click();
        await this.login.click();
        await this.userLoginData.fill(this.user_email);
        await this.userPasswordLoginData.fill(this.user_password);
        await this.buttonLogin.click();
    };

    async validateAndConfirmAddress() {
        await expect(this.page.getByRole('heading', { name: '¿Dónde enviamos tu pedido?' })).toBeVisible({ timeout: 25000 });
        await this.buttonGoToShop.click();
        const nameAccount = await this.page.getByText(this.user_name).textContent();
        console.log(nameAccount);
    }
}

module.exports = { LoginPage };