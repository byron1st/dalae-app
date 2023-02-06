import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { APIError, handleError } from '$lib/api.server';
import { momentsCol } from '$lib/model/moment.server';
import { getMomentDTO, type MomentDTO } from '$lib/dto/moment';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals }) => {
	try {
		if (!locals.uid) throw new APIError(401);

		const newMomentDTO: MomentDTO = await request.json();
		const { text, date, tags } = newMomentDTO;
		if (!text || !text.trim() || !date || date === 0) throw new APIError(400);
		if (tags && (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string'))) {
			throw new APIError(400);
		}

		const col = await momentsCol();
		const result = await col.insertOne({
			_id: new ObjectId(),
			ownerId: locals.uid,
			text,
			date: new Date(date),
			tags: tags ?? []
		});
		newMomentDTO.id = result.insertedId.toHexString();

		return json(newMomentDTO);
	} catch (err) {
		throw handleError(err);
	}
}) satisfies RequestHandler;

const DEFAULT_MOMENTS_COUNT = 10;

export const GET = (async ({ request, locals }) => {
	try {
		if (!locals.uid) throw new APIError(401);

		const url = new URL(request.url);
		const skipVal = Number(url.searchParams.get('skip'));
		const skip = Number.isInteger(skipVal) ? skipVal : 0;
		const limitVal = Number(url.searchParams.get('limit'));
		const limit = Number.isInteger(limitVal) ? limitVal : DEFAULT_MOMENTS_COUNT;

		const col = await momentsCol();
		const moments = await col
			.find({ ownerId: locals.uid })
			.skip(skip)
			.limit(limit)
			.sort({ date: 'desc' })
			.toArray();

		return json(moments.map(getMomentDTO));
	} catch (err) {
		throw handleError(err);
	}
}) satisfies RequestHandler;
