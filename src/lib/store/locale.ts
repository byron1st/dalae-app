import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import scripts, { type Scripts } from '$lib/i18n-scripts';

type LocaleStr = keyof Scripts;

export const locale = writable<LocaleStr>();

export function initLocale() {
	if (browser) {
		const lo = navigator.language.split('-')[0];
		if (lo !== 'en' && isLocaleStr(lo)) locale.set(lo);
	}
}

function isLocaleStr(lo: string): lo is LocaleStr {
	return Object.keys(scripts).includes(lo);
}
