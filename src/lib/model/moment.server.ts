import type { Collection, WithId } from 'mongodb';
import { MONGODB_DB_NAME } from '$env/static/private';
import clientConnect from '$lib/database/mongodb.server';

export const MOMENTS_COL = 'moments';

export type Moment = {
	ownerId: string;
	text: string;
	date: Date;
	tags: string[];
};

type MomentsCol = Collection<WithId<Moment>>;

export async function momentsCol(): Promise<MomentsCol> {
	const client = await clientConnect;
	return client.db(MONGODB_DB_NAME).collection<WithId<Moment>>(MOMENTS_COL);
}
