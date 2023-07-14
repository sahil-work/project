import { Collection, Document } from "mongodb";

/**
 * Upserts a document with two fields in a collection.
 *
 * @param {Collection<Document>} collection - The MongoDB collection.
 * @param {Document} document - The document to upsert.
 * @param {string} secondField - The name of the second field to update or insert.
 */
export function upsertDocument(collection: Collection<Document>, document: Document, secondField: string): void {
    const updateQuery = { _id: document._id };
    const updateData = { $set: { [secondField]: document[secondField] } };
    const options = { upsert: true };

    collection.updateOne(updateQuery, updateData, options)
        .catch((error) => {
            // Handle any errors that occur during the upsert process
            console.error('Error upserting document:', error);
        });
}