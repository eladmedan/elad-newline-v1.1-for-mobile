import { writable } from "svelte/store";

export let selectedWpm = writable(0);



export let min_wpm = writable(-300);
export let negetive_wpm = writable(-100);
export let positive_wpm = writable(150);
export let max_wpm = writable(450);


