import type { WithId } from 'mongodb';
import type { Moment } from '$lib/model/moment.server';

export type MomentDTO = {
	id: string;
	text: string;
	date: number;
	tags: string[];
};

export function getMomentDTO(moment: WithId<Moment>): MomentDTO {
	const { _id, text, date, tags } = moment;
	return { id: _id.toHexString(), text, date: date.getTime(), tags };
}
