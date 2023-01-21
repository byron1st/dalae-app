import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

const userStore = writable<User | null>(undefined);

export default userStore;
