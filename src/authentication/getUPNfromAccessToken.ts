import axios from "axios";

/**
 * Retrieves the User Principal Name (UPN) from the Microsoft Graph API using the provided access token.
 *
 * @param {string} access_token - The access token to use for the API request.
 * @returns {Promise<string>} A Promise that resolves to the User Principal Name (UPN) of the user.
 */
export async function getUPNfromAccessToken(access_token: string): Promise<string> {
  const userEndpoint = 'https://graph.microsoft.com/v1.0/me';
  const userResponse = await axios.get(userEndpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  return userResponse.data.userPrincipalName;
}
