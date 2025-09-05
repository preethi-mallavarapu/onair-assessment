import { test, expect } from '@playwright/test';

//Define test creds
const USERS = {
  standard: 'standard_user',
  locked: 'locked_out_user',
  problem: 'problem_user',
};
const PASSWORD = 'secret_sauce';

//Common method for Login functionality
async function login(page, username) {
  await page.goto('/');
  await page.fill('#user-name', username);
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');
}

//Ensure no cookies, sessions, or localStorage 
test.beforeEach(async ({ context }) => {
  await context.clearCookies();
  const page = await context.newPage();
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  await page.close();
});


test.describe('SauceDemo QA Assessment', () => {

  //Login
  test('standard_user - successful login', async ({ page }) => {
    await login(page, USERS.standard);
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('locked_out_user - shows error', async ({ page }) => {
    await login(page, USERS.locked);
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Sorry, this user has been locked out.');
  });

  test('problem_user - login works even with quirks', async ({ page }) => {
    await login(page, USERS.problem);
    await expect(page).toHaveURL(/.*inventory.html/);
  });
  

  //Logout
  test('logout - redirected to /', async ({ page }) => {
    await login(page, USERS.standard);
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
  
  //Add item to cart
  test('add item to cart - badge increments & listed in cart', async ({ page }) => {
    await login(page, USERS.standard);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });
  
  //Remove item from cart
  test('remove item from cart - badge clears & not listed', async ({ page }) => {
    await login(page, USERS.standard);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
  
  //Checkout 1 item
  test('checkout 1 item - order completes', async ({ page }) => {
    await login(page, USERS.standard);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();

    //Fill checkout
    await page.fill('[data-test="firstName"]', 'QA');
    await page.fill('[data-test="lastName"]', 'Tester');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.locator('[data-test="continue"]').click();

    //Finish
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });
});
