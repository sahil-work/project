import { saveRefreshTokenAndEmail } from "../database/saveRefreshTokenAndEmail";
import axios from "axios";
import { getUPNfromAccessToken } from "./getUPNfromAccessToken";

/**
 * Performs token exchange to obtain access and refresh tokens and save them along with the email in the database.
 *
 * @param {string} code - The authorization code obtained from the redirect.
 * @returns {Promise<void>} A Promise that resolves when the refresh token and email are saved successfully.
 */
export async function handleRedirectedCode(code: string): Promise<void> {
    const tokenExchangeUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
    const tokenExchangeData = new URLSearchParams();
    tokenExchangeData.append('client_id', process.env.BOT_ID);
    tokenExchangeData.append('scope', 'openId profile offline_access User.Read');
    tokenExchangeData.append('redirect_uri', 'http://localhost:3978/api/oauth/redirect');
    tokenExchangeData.append('grant_type', 'authorization_code');
    tokenExchangeData.append('client_secret', process.env.BOT_PASSWORD);
    tokenExchangeData.append('code', code);
    const tokenResponse = await axios.post(tokenExchangeUrl, tokenExchangeData.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const tokens = tokenResponse.data;
    const userPrincipalName = await getUPNfromAccessToken(tokens.access_token);
    await saveRefreshTokenAndEmail(tokens.refresh_token, userPrincipalName);
}
