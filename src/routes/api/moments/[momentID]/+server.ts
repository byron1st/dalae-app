import { error, json } from '@sveltejs/kit';
import { ObjectId, type WithId } from 'mongodb';
import { APIError, handleError } from '$lib/api.server';
import { momentsCol, type Moment } from '$lib/model/moment.server';
import { getMomentDTO, type MomentDTO } from '$lib/dto/moment';
import type { RequestHandler } from './$types';

export const PUT = (async ({ request, locals, params }) => {
	try {
		if (!locals.uid) throw new APIError(401);
		if (!params.momentID) throw new APIError(400);

		const body: Partial<MomentDTO> = await request.json();

		const setters: Partial<WithId<Moment>> = {};
		if (body.text) setters.text = body.text;
		if (body.date) setters.date = new Date(body.date);
		setters.tags = body.tags ?? [];

		const col = await momentsCol();

		const _id = new ObjectId(params.momentID);
		await col.updateOne({ _id }, { $set: setters });

		const moment = await col.findOne({ _id });
		if (!moment) throw new APIError(500, 'failed to get an updated moment');

		return json(getMomentDTO(moment));
	} catch (err) {
		throw handleError(err);
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ locals, params }) => {
	try {
		if (!locals.uid) throw error(401);
		if (!params.momentID) throw new APIError(400);

		const col = await momentsCol();
		await col.deleteOne({ _id: new ObjectId(params.momentID) });

		return json({ success: true });
	} catch (err) {
		throw handleError(err);
	}
}) satisfies RequestHandler;
