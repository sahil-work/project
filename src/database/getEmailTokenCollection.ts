import { Collection } from 'mongodb';
import { client, db } from './mongoConnection';

/**
 * Returns the 'email-token' collection.
 *
 * @returns {Collection} The 'email-token' collection.
 *
 * @property {string} _id - The email ID.
 * @property {string} refresh_token - The token value.
 */

export const getEmailTokenCollection = (): Collection => {
	if (!client || !db) {
		throw new Error("MongoDB connection not established");
	}
	return db.collection("email-token");
};