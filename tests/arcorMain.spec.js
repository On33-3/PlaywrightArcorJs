const {test} = require('@playwright/test');
const {LoginPage} = require('../pagesArcor/LoginPage');




test("E2E Test Arcor Portfolio" , async ({page}) => {
const loginPage = new LoginPage(page);
await loginPage.goToArcor();
await loginPage.setUserAndPasswordLogin();
await loginPage.validateAndConfirmAddress();

})






