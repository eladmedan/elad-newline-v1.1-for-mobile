import { writable } from "svelte/store";

export let isHoverNextChapter = writable(false);
export let isHoverBackwardsHigh = writable(false);
export let isHoverBackwardsLow = writable(false);
export let isHoverBreak = writable(false);
export let isHoverForwardsLow = writable(false);
export let isHoverForwardsHigh = writable(false);
export let isHoverPrevChapter = writable(false);
export let isHoverBottomNav = writable(false);
export let isHoverTopHeader = writable(false);