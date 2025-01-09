import { derived, Readable, Writable, writable } from "svelte/store";

export const secondsToLostEyes: Writable<number> = writable(15);
export const secondsToSoftReload: Writable<number> = writable(60 * 1);
export const secondsToHardReload: Writable<number> = writable(60 * 10);

export const inactiveSeconds: Writable<number> = writable(0);
export const hasLostEyeContact: Readable<boolean> = derived(
  [inactiveSeconds, secondsToLostEyes],
  ([$inactiveSeconds, $secondsToLostEyes], set) => set($inactiveSeconds >= $secondsToLostEyes)
);

export function wake() {
  inactiveSeconds.set(0);
}
