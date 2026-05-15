import { test, expect } from '@playwright/test';

test('Verify functionality 12 in Feature Module 1', async ({ page }) => {
  // Go to the website
  await page.goto('https://socket9.com/en');

  // Extract the title of the web page
  const pageTitle = await page.title();

  // Log the title of the web page
  console.log(`Page title: ${pageTitle}`);

  // Assert the web page title (update the expected title as needed)
  expect(pageTitle).toBe('Expected Page Title');
});