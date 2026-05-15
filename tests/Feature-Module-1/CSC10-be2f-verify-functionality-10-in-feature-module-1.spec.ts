import { test, expect } from '@playwright/test';

test('Verify functionality 10 in Feature Module 1', async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('https://socket9.com/en');

  // Step 2: Log the title of the website
  const title = await page.title();
  console.log(`Website title: ${title}`);

});