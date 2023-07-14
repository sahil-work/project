import { getEmailTokenCollection } from './getEmailTokenCollection';
import { Collection } from 'mongodb';

/**
 * Retrieves the user token associated with the specified email.
 *
 * @param {string} email - The email address of the user.
 * @returns {string | null} The user token or null if not found.
 */
export async function getUserToken(email: string): Promise<string | null> {
    try {
        const emailToToken: Collection = getEmailTokenCollection();
        const emailTokenDocument = await emailToToken.findOne({ _id: email } as any);

        if (emailTokenDocument) {
            return emailTokenDocument.refresh_token;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user token:', error);
    }
}