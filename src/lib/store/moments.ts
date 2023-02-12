import {
	createInfiniteQuery,
	createMutation,
	QueryClient,
	type CreateInfiniteQueryResult,
	type CreateMutationResult,
	type InfiniteData
} from '@tanstack/svelte-query';
import { create, read, update, remove } from '$lib/api';
import type { MomentDTO } from '$lib/dto/moment';

export const momentsStoresKey = 'moments';
const momentsKey = ['moments'];
const defaultLimit = 10;

export type MomentsStoresType = {
	data: CreateInfiniteQueryResult<MomentDTO[], Error>;
	mutations: MomentsMutations;
};
type MomentsMutations = {
	create: CreateMutationResult<MomentDTO, Error, Omit<MomentDTO, 'id'>, MomentsContext>;
	update: CreateMutationResult<MomentDTO, Error, MomentDTO, MomentsContext>;
	delete: CreateMutationResult<string, Error, Pick<MomentDTO, 'id'>, MomentsContext>;
};
type MomentsContext = { previousData: InfiniteData<MomentDTO[]> };

export function createMomentsStores(client: QueryClient): MomentsStoresType {
	return {
		data: readMoments(),
		mutations: mutations(client)
	};
}

export function readMoments() {
	return createInfiniteQuery<MomentDTO[], Error>({
		queryKey: momentsKey,
		queryFn: async ({ pageParam = 1 }): Promise<MomentDTO[]> => {
			return await read('/api/moments', {
				skip: defaultLimit * (pageParam - 1),
				limit: defaultLimit
			});
		},
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < defaultLimit) return undefined;
			return allPages.length + 1;
		}
	});
}

export function mutations(client: QueryClient): MomentsMutations {
	const onMutate = () => {
		const previousData = client.getQueryData<InfiniteData<MomentDTO[]>>(momentsKey);
		if (!previousData) return;

		return previousData ? { previousData } : undefined;
	};

	return {
		create: createMutation(async (variables) => await create('/api/moments', variables), {
			onMutate,
			onError,
			onSuccess: (newMoment, _variables, context) => {
				if (!context) return;

				const { pages } = getNewMomentsData(context.previousData.pages);

				pages[0].splice(0, 0, newMoment);
				client.setQueryData(momentsKey, { ...context.previousData, pages: pages });
			}
		}),
		update: createMutation(async ({ id, ...opts }) => await update(`/api/moments/${id}`, opts), {
			onMutate,
			onError,
			onSuccess: (newMoment, _variables, context) => {
				if (!context) return;

				const { pages, indexes } = getNewMomentsData(context.previousData.pages, newMoment.id);
				if (!indexes) return;

				if (pages[indexes.page][indexes.item].date !== newMoment.date) {
					client.invalidateQueries(momentsKey);
				} else {
					pages[indexes.page][indexes.item] = newMoment;
					client.setQueryData(momentsKey, { ...context.previousData, pages: pages });
				}
			}
		}),
		delete: createMutation(
			async ({ id }) => {
				await remove(`/api/moments/${id}`);
				return id;
			},
			{
				onMutate,
				onError,
				onSuccess: (removedId, _variables, context) => {
					if (!context) return;

					const { pages, indexes } = getNewMomentsData(context.previousData.pages, removedId);
					if (!indexes) return;

					pages[indexes.page].splice(indexes.item, 1);
					client.setQueryData(momentsKey, { ...context.previousData, pages: pages });
				}
			}
		)
	};
}

function onError(err: Error) {
	console.error(err);
}

function getNewMomentsData(
	previousPages: MomentDTO[][],
	itemId?: string
): { pages: MomentDTO[][]; indexes?: { page: number; item: number } } {
	const pages: MomentDTO[][] = JSON.parse(JSON.stringify(previousPages));
	if (!itemId) return { pages };

	let itemIndex = -1;
	const pageIndex = pages.findIndex((page) => {
		const index = page.findIndex((pageItem) => pageItem.id === itemId);
		if (index !== -1) {
			itemIndex = index;
			return true;
		}
	});
	if (itemIndex === -1 || pageIndex === -1) return { pages };

	return { pages, indexes: { page: pageIndex, item: itemIndex } };
}
