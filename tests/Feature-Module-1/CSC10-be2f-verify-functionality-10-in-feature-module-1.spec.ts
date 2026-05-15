import { test, expect } from '@playwright/test';

test('[CSC10-be2f] Verify functionality 10 in Feature Module 1', async ({ page }) => {
  // Step 1: Navigate to the website
  await page.goto('https://tms-neon-omega.vercel.app/');

  // Step 2: Log the title of the website
  const title = await page.title();
  console.log(`Website title: ${title}`);

});