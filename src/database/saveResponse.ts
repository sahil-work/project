import { getResponseCollection } from './getResponseCollection';
import { upsertDocument } from "./upsertDocument";

/**
 * Saves a response in the database associated with the specified email.
 *
 * @param {string} response - The response to save.
 * @param {string} email - The email associated with the response.
 * @returns {Promise<void>} A Promise that resolves once the response is saved.
 */
export async function saveResponse(response: string, email: string): Promise<void> {
	try {
		const responseCollection = getResponseCollection();
		const responseDocument = { _id: email, response: response };
		upsertDocument(responseCollection, responseDocument, "response");
	} catch (error) {
		console.error('Error saving response:', error);
	}
}