import { writable } from "svelte/store";


export let canNavigate = writable(false);
export let shouldPlay = writable(false);