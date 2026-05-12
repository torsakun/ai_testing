import { test, expect } from '@playwright/test';

test('Verify happy path for Customer Support Desk', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://www.socket9.com/en');

  // Log website title
  const title = await page.title();
  console.log(`Website Title: ${title}`);
});