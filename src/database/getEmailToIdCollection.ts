import { Collection } from 'mongodb';
import { client, db } from './mongoConnection';

/**
 * Returns the 'id-email' collection.
 *
 * @returns {Collection} The 'id-email' collection.
 *
 * @property {string} _id - The email address.
 * @property {string} user_id - The id value.
 */

export const getEmailToIdCollection = (): Collection => {
	if (!client || !db) {
		throw new Error("MongoDB connection not established");
	}
	return db.collection("id-email");
};