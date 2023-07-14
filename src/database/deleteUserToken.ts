import { getEmailTokenCollection } from './getEmailTokenCollection';
import { Collection, DeleteResult } from 'mongodb';

/**
 * Deletes the user token associated with the specified email.
 *
 * @param {string} email - The email address of the user.
 * @returns {Promise<void>} A Promise that resolves immediately.
 */
export function deleteUserToken(email: string): Promise<DeleteResult> {
	const emailToToken: Collection = getEmailTokenCollection();
	return emailToToken.deleteOne({ _id: email } as any);
}