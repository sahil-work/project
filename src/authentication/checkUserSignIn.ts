import { getUserToken } from "../database/getUserToken";
import axios from "axios";

/**
 * Checks if the user with the specified email is signed in.
 *
 * @param {string} email - The email of the user to check.
 * @returns {Promise<boolean>} A Promise that resolves to true if the user is signed in, false otherwise.
 */
export async function checkUserSignIn(email: string): Promise<boolean> {
    const refresh_token = await getUserToken(email);

    if (!refresh_token) {
        return false;
    } 
    else {
        const tokenExchangeUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/token';
        const tokenExchangeData = new URLSearchParams();
        tokenExchangeData.append('client_id', process.env.BOT_ID);
        tokenExchangeData.append('scope', 'openId profile offline_access User.Read');
        tokenExchangeData.append('redirect_uri', 'http://localhost:3978/api/oauth/redirect');
        tokenExchangeData.append('grant_type', 'refresh_token');
        tokenExchangeData.append('client_secret', process.env.BOT_PASSWORD);
        tokenExchangeData.append('refresh_token', refresh_token);

        const response = await axios.post(tokenExchangeUrl, tokenExchangeData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const tokens = response.data;

        if (tokens.access_token) {
            return true;
        } else {
            return false;
        }
    }
}
