/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MongoClient } from 'mongodb';
import { dev } from '$app/environment';
import { MONGODB_HOST_URI, MONGODB_DB_NAME } from '$env/static/private';

if (!MONGODB_HOST_URI || !MONGODB_DB_NAME) {
	throw new Error('Invalid/Missing environment variables for mongodb');
}

let client;
let clientConnect: Promise<MongoClient>;

const MONGODB_URI = `${MONGODB_HOST_URI}/${MONGODB_DB_NAME}`;

if (dev) {
	// @ts-ignore
	if (!global.__mongoClientConnect) {
		client = new MongoClient(MONGODB_URI, {});
		// @ts-ignore
		global.__mongoClientConnect = client.connect();
	}

	// @ts-ignore
	clientConnect = global.__mongoClientConnect;
} else {
	client = new MongoClient(MONGODB_URI, {});
	clientConnect = client.connect();
}

export default clientConnect;
