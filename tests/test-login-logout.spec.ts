import { test, expect } from '@playwright/test';

test('login-logout', async ({ page }) => {

await page.goto('https://soc-llm.vercel.app/');
await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
await page.getByRole('link', { name: 'Login' }).click();
await expect(page.getByText('Please log in to continue.EmailPasswordLog in')).toBeVisible();
await expect(page.getByPlaceholder('Enter your email address')).toBeVisible();
await expect(page.getByPlaceholder('Enter password')).toBeVisible();
await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
await expect(page.getByRole('link', { name: 'No account yet? Sign up' })).toBeVisible();
await expect(page.getByRole('link', { name: 'Not ready to log in? Go back' })).toBeVisible();
await page.getByPlaceholder('Enter your email address').click();
await page.getByPlaceholder('Enter your email address').fill('demo@demo.com');
await page.getByPlaceholder('Enter password').click();
await page.getByPlaceholder('Enter password').fill('demodemo');
await page.getByRole('button', { name: 'Log in' }).click();
await expect(page.getByRole('main').locator('div').filter({ hasText: 'Chat History' }).nth(2)).toBeVisible();
await expect(page.getByRole('button', { name: 'Toggle Sidebar' })).toBeVisible();
await expect(page.getByRole('button', { name: 'de demo@demo.com' })).toBeVisible();
await page.getByRole('link', { name: 'New Chat' }).click();
await expect(page.getByRole('link', { name: 'New Chat' })).toBeVisible();
await page.getByRole('button', { name: 'de demo@demo.com' }).click();
await page.getByLabel('dedemo@demo.com').click();
await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
await page.getByRole('button', { name: 'Sign Out' }).click();
await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});