import { writable } from "svelte/store";

export let hideWebgazer = writable(false);
export let webgazerInitiated = writable(false);
export let xprediction = writable();
export let yprediction = writable();