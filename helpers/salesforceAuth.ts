// import axios from 'axios';
// import { generateJwtToken } from '../utils/jwtHelpers';

// export async function loginToSalesforceJWT(username: string, clientId: string) {
//   const jwtToken = generateJwtToken({ username, clientId });

//   const response = await axios.post(
//     'https://login.salesforce.com/services/oauth2/token',
//     new URLSearchParams({
//       grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
//       assertion: jwtToken,
//     }),
//     {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     }
//   );

//   return {
//     accessToken: response.data.access_token,
//     instanceUrl: response.data.instance_url,
//   };
// }
import axios from 'axios';
import { generateJwtToken } from '../utils/jwtHelpers';

export async function loginToSalesforceJWT(username: string, clientId: string) {
  try {
    const jwtToken = generateJwtToken({ username, clientId });

    const response = await axios.post(
      'https://login.salesforce.com/services/oauth2/token',
      new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwtToken,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return {
      accessToken: response.data.access_token,
      instanceUrl: response.data.instance_url,
    };
  } catch (error: any) {
    console.error('Salesforce JWT login failed:', error.response?.data || error.message);
    throw error;
  }
}
