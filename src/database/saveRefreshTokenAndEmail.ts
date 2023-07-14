import { getEmailTokenCollection } from './getEmailTokenCollection';
import { upsertDocument } from "./upsertDocument";


/**
 * Saves the refresh token and email in the database.
 *
 * @param {string} refresh_token - The refresh token to save.
 * @param {string} email - The email associated with the refresh token.
 * @returns {Promise<void>} A Promise that resolves once the refresh token and email are saved.
 */
export async function saveRefreshTokenAndEmail(refresh_token: string, email: string): Promise<void> {
	try {
		const emailToToken = getEmailTokenCollection();
		const emailTokenDocument = { _id: email, refresh_token: refresh_token };
		upsertDocument(emailToToken, emailTokenDocument, "refresh_token");
	} catch (error) {
		console.error('Error saving refresh token and email:', error);
	}
}