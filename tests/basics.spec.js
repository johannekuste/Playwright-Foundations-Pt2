// @ts-check

const { test, expect } = require('@playwright/test')

test('Navigate to page and login', async({ page }) =>{
    await page.goto('https://www.saucedemo.com/')
    await page.locator('id=user-name').fill('standard_user')
    await page.locator('id=password').fill('secret_sauce')
    const menuBtn = await page.locator('id=react-burger-menu-btn')
    await page.locator('id=login-button').click()

    await expect(menuBtn).toBeVisible()

    await menuBtn.click()
    const menu = await page.locator('//*[@class="mb-menu-wrap"]')
    await page.getByText(/Logout/i).click()

    await expect(menu).not.toBeVisible()
    
    await page.waitForTimeout(1000)
})