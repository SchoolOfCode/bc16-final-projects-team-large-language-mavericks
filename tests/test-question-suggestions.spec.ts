import { test, expect } from '@playwright/test';
import exp from 'constants';

test('test question suggestions', async ({ page }) => {
  await page.goto('https://soc-llm.vercel.app/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.locator('.mx-auto > div').first()).toBeVisible();
  // click on the last question suggestion
  await expect(page.locator('.cursor-pointer.inline-start').last()).toBeVisible();
  await page.locator('.cursor-pointer.inline-start').last().click();
  // expect SoC icon to be visible along with the answer bubble
  await expect(page.getByRole('img', { name: 'Icon of SoC Coach' })).toBeVisible();
  await expect(page.locator('.prose')).toBeVisible();
  
});
