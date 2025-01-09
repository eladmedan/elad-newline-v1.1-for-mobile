import { writable } from "svelte/store";

export let hasCalibrated = writable(false);
export let showClibrationBanner = writable(true);
export let eyeLost = writable(true);
