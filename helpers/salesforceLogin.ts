import { Page } from '@playwright/test';
import { loginToSalesforceJWT } from './salesforceAuth';

export async function loginAsUser(page: Page, username: string, clientId: string) {
  const { accessToken, instanceUrl } = await loginToSalesforceJWT(username, clientId);

  await page.context().addCookies([
    {
      name: 'sid',
      value: accessToken,
      domain: '.salesforce.com',
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Lax',
    },
  ]);

  await page.goto(`${instanceUrl}/lightning/page/home`);
  return { accessToken, instanceUrl };
}
