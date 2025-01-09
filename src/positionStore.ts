import { derived, Readable, Writable, writable } from "svelte/store";
import { rtl } from "./lib/1.1/helpers/i18n";
import { eyeLost, hasCalibrated } from "./lib/1.1/stores/calibrationStore";

interface XY {
  x: number;
  y: number;
}

export let mouse: Writable<XY> = writable({ x: 0, y: 0 });
export let eye: Writable<XY> = writable({ x: 0, y: 0 });
export let isMouseInWindow = writable(false);
export let screenW = writable(0);
export let screenH = writable(0);

export let focus: Readable<XY> = derived(
  [mouse, eye, hasCalibrated, screenW, screenH],
  ([$mouse, $eye, $hasCalibrated, $screenW, $screenH]) => {
    let $focus;
    if ($hasCalibrated) {
      $focus = $eye;
    } else {
      $focus = $mouse;
    }
    return {
      x: Math.min(Math.max($focus.x, 1), $screenW - 1),
      y: Math.min(Math.max($focus.y, 1), $screenH - 1),
    };
  }
);

// function min0max100(value) {
//   return Math.min(Math.max(value, 0), 100);
// }

export let Xpercent = derived(
  [focus, screenW, rtl],
  ([$focus, $screenW, $rtl]) =>
    ($focus.x / $screenW) * 100 * ($rtl ? -1 : 1) + ($rtl ? 100 : 0)
);
export let Ypercent = derived(
  [focus, screenH],
  ([$focus, $screenH]) => ($focus.y / $screenH) * 100
);

export let focusLost: Readable<Boolean> = derived(
  [hasCalibrated, eyeLost],
  ([$hasCalibrated, $eyeLost]) => ($hasCalibrated ? $eyeLost : false)
);
