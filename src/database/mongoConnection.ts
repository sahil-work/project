import { MongoClient, Db } from 'mongodb';

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'bot-trial';

export let client: MongoClient;
export let db: Db;

export const mongoConnection = async (): Promise<void> => {
	try {
		client = await MongoClient.connect(mongoUrl);
		db = client.db(dbName);
		console.log('Mongo connection open');
	} catch (error) {
		console.error(error);
		throw error;
	}
};