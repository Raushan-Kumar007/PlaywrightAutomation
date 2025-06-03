import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export function generateJwtToken({
  username,
  clientId,
}: {
  username: string;
  clientId: string;
}): string {
  const privateKeyPath = path.join(__dirname, '../fixtures/server.key');
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

  const token = jwt.sign(
    {
      iss: clientId,
      sub: username,
      aud: 'https://login.salesforce.com',
      exp: Math.floor(Date.now() / 1000) + 3 * 60,
    },
    privateKey,
    { algorithm: 'RS256' }
  );

  return token;
}
