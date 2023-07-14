import { Collection } from 'mongodb';
import { client, db } from './mongoConnection';

/**
 * Returns the 'responses' collection.
 *
 * @returns {Collection} The 'responses' collection.
 *
 * @property {string} _id - The email id.
 * @property {string} response - The response content.
 */
export const getResponseCollection = (): Collection => {
	if (!client || !db) {
		throw new Error("MongoDB connection not established");
	}
	return db.collection("responses");
};