import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { loginAsUser } from '../helpers/salesforceLogin';

dotenv.config();

test('Login to Salesforce as main user', async ({ page }) => {
  const username = process.env.SF_USERNAME!;
  const clientId = process.env.SF_CLIENT_ID!;

  await loginAsUser(page, username, clientId);
  await expect(page).toHaveURL(/lightning/);
});
test('Login to Salesforce as main user2', async ({ page }) => {
  const clientId = process.env.SF_CLIENT_ID!;
  await loginAsUser(page, "frank123@gmail.com", clientId);
  await expect(page).toHaveURL(/lightning/);
});