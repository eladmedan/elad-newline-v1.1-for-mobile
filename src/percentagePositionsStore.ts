import { derived, Readable, writable } from "svelte/store";

export let sliderPositions = writable([
  0, 10, 19, 26, 34, 46.5, 65, 81.5, 90, 100,
]);
export let topHeaderHeight = writable(15);
export let bottomNavHeight = writable(25);
export let sexyDuration = writable(3000);

export let prevChapStartPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][0]);
  }
);
export let prevChapEndPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][1]);
  }
);
export let prevChapWidthPercent: Readable<number> = derived(
  [prevChapEndPos, prevChapStartPos],
  ([$prevChapEndPos, $prevChapStartPos]) => {
    return $prevChapEndPos - $prevChapStartPos;
  }
);
export let backwardsHighStartPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][2]);
  }
);
export let backwardsLowStartPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][3]);
  }
);
export let breakStartPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][4]);
  }
);
export let forwardsLowStartPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][5]);
  }
);
export let forwardsHighStartPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][6]);
  }
);
export let forwardsHighEndPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][7]);
  }
);
export let nextChapStartPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][8]);
  }
);
export let nextChapEndPos: Readable<number> = derived(
  [sliderPositions],
  ($values, set) => {
    set($values[0][9]);
  }
);

export let nextChapWidthPercent: Readable<number> = derived(
  [nextChapEndPos, nextChapStartPos],
  ([$nextChapEndPos, $nextChapStartPos]) => {
    return $nextChapEndPos - $nextChapStartPos;
  }
);
