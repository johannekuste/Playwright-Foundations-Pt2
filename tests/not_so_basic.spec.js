// @ts-check

const { test, expect } = require('@playwright/test')

test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com/')
    await page.locator('id=user-name').fill('standard_user')
    await page.locator('id=password').fill('secret_sauce')
    const menuBtn = await page.locator('id=react-burger-menu-btn')
    await page.locator('id=login-button').click()

    await expect(menuBtn).toBeVisible()
})

test.describe('Add several products to shopping cart', () => {
    test('Add the backpack', async({ page }) =>{
        // This is where the fun begins
        const menuBtn = await page.locator('id=react-burger-menu-btn')
        await page.getByText('Sauce Labs Backpack').click()
        await page.locator('//*[@data-test="add-to-cart"]').click()
        await page.locator('//*[@data-test="shopping-cart-link"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await page.locator('//*[@data-test="checkout"]').click()
    
        await menuBtn.click()
        
        await page.waitForTimeout(1000)
    })

    test('Add the jacket', async({ page }) =>{
        // This is where the fun begins
        const menuBtn = await page.locator('id=react-burger-menu-btn')
        await page.getByText('Sauce Labs Fleece Jacket').click()
        await page.locator('//*[@data-test="add-to-cart"]').click()
        await page.locator('//*[@data-test="shopping-cart-link"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
        await page.locator('//*[@data-test="checkout"]').click()
    
        await menuBtn.click()
        await page.waitForTimeout(1000)
    })
})

test.afterEach(async({page})=>{
    const menu = await page.locator('//*[@class="mb-menu-wrap"]')
    
    await page.getByText(/Logout/i).click()

    await expect(menu).not.toBeVisible()
})