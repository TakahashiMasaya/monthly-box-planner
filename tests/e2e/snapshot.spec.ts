import { test, expect } from '@playwright/test'

test('full page screenshot visual regression', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(3000) // Wait for 3 seconds
  await expect(page).toHaveScreenshot()
})
