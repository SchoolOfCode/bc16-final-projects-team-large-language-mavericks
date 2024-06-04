import { test, expect } from '@playwright/test';

test('Curriculum response test', async ({ page }) => {
  await page.goto('https://soc-llm.vercel.app/');
  await expect(page.locator('.relative > .relative')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome to the School of Code' })).toBeVisible();
  await expect(page.getByText('LoginLearn WorldToggle theme')).toBeVisible();
  await expect(page.getByText('New ChatSend messageOpen')).toBeVisible();
  await expect(page.getByRole('button', { name: 'New Chat' })).toBeVisible();
  await expect(page.getByPlaceholder('Ask me a question 🤖')).toBeVisible();
  await page.getByPlaceholder('Ask me a question 🤖').click();
  await page.getByPlaceholder('Ask me a question 🤖').fill('What is the School of Code curriculum?');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.locator('div:nth-child(2) > .group > .hidden')).toBeVisible();
  await expect(page.getByText('What is the School of Code')).toBeVisible();
  await expect(page.getByRole('img', { name: 'Icon of SoC Coach' })).toBeVisible();
  await expect(page.locator('.prose')).toBeVisible();
  await expect(page.getByText('Week 1: School of Code Onboarding')).toBeVisible();
  // await expect(page.getByRole('link', { name: 'here' })).toBeVisible({ timeout: 15000 });
});