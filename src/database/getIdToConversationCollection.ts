import { Collection } from 'mongodb';
import { client, db } from './mongoConnection';

/**
 * Returns the 'convo-ref' collection.
 *
 * @returns {Collection} The 'convo-ref' collection.
 *
 * @property {string} _id - The conversation ID.
 * @property {string} conversationReference - The reference value.
 */

export const getIdToConversationCollection = (): Collection => {
	if (!client || !db) {
		throw new Error("MongoDB connection not established");
	}
	return db.collection("convo-ref");
};