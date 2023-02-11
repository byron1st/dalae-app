import { derived } from 'svelte/store';
import scripts from '$lib/i18n/scripts';
import { locale } from '$lib/store/locale';

export const s = derived(locale, ($locale) => scripts[$locale] ?? scripts.empty);
