import { writable } from "svelte/store";

export let avarageWordInPixels = writable(0);
export let currentChapterPercentage = writable(0);
export let currentBookPercentage = writable(0);


export let chapterWidth = writable(0);
export let chapterArrowWidth = writable(0);
export let chapterScrolledPixels = writable(0);