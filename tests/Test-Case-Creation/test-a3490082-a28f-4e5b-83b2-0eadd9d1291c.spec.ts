import { test, expect } from '@playwright/test';

test('Test Homepage Loads', async ({ page }) => {
  await page.goto('http://164.68.113.171:3000/');
  await expect(page).toHaveTitle(/./);
});
