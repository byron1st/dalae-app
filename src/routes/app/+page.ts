import type { Moment } from '$lib/dto/moment';
import type { PageLoad } from './$types';

export const load = (async () => {
	return { moments };
}) satisfies PageLoad;

// TODO: fetch moments
const moments: Moment[] = [
	{
		id: '1',
		text: 'Lorem ipsum dolor sit amet. Eum fugiat magni eum quia repudiandae aut corporis natus. Eos vero velit sit autem consequuntur qui illum labore 33 nihil harum? Rem esse praesentium qui accusantium dolores id dolorem numquam.',
		date: new Date().getTime(),
		tags: ['tags1', 'tags2', 'tags3']
	},
	{
		id: '2',
		text: 'Lorem ipsum dolor sit amet. Eum fugiat magni eum quia repudiandae aut corporis natus. Eos vero velit sit autem consequuntur qui illum labore 33 nihil harum? Rem esse praesentium qui accusantium dolores id dolorem numquam.',
		date: new Date().getTime(),
		tags: ['tags1', 'tags2', 'tags3']
	},
	{
		id: '3',
		text: 'Lorem ipsum dolor sit amet. Eum fugiat magni eum quia repudiandae aut corporis natus. Eos vero velit sit autem consequuntur qui illum labore 33 nihil harum? Rem esse praesentium qui accusantium dolores id dolorem numquam.',
		date: new Date().getTime(),
		tags: ['tags1', 'tags2', 'tags3']
	},
	{
		id: '4',
		text: 'Lorem ipsum dolor sit amet. Eum fugiat magni eum quia repudiandae aut corporis natus. Eos vero velit sit autem consequuntur qui illum labore 33 nihil harum? Rem esse praesentium qui accusantium dolores id dolorem numquam.',
		date: new Date().getTime(),
		tags: ['tags1', 'tags2', 'tags3']
	}
];
