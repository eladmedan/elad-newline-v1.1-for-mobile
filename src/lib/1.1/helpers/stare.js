import { focus, focusLost } from "./../../../positionStore";

import { derived } from "svelte/store";
import { onMount } from "svelte";

let miliSteps = 30;
let restartOnFinish = false;

export function stare(node, duration = 1000) {
  let timer;

  let status;
  let counter = 0;

  let restartTimer;

  const checkShouldFire = () => {
    if (counter >= duration) {
      node.dispatchEvent(new CustomEvent("stare"));
      console.log("STARE!");

      if (restartOnFinish) {
        clearTimeout(restartTimer);
        restartTimer = setTimeout(() => {
          counter = 0;
          handleMousedown();
        }, 3000);
      }
    }
  };

  const handleMousedown = () => {
    clearTimeout(timer);

    if (duration > counter) {
      timer = setTimeout(() => {
        counter += miliSteps;
        const fill = Math.min(counter / duration, 1);
        // 				node.innerText = fill; // for testing
        node.style.setProperty("--fill", fill);
        node.style.setProperty("--fill-percentage", fill * 100 + "%");
        node.dispatchEvent(new CustomEvent("fill", { detail: { fill } }));
        handleMousedown();
        checkShouldFire();
      }, miliSteps);
    }
  };
  const handleMouseup = () => {
    clearTimeout(timer);

    if (counter > 0) {
      timer = setTimeout(() => {
        counter -= miliSteps;
        const fill = Math.min(counter / duration, 1);
        // 				node.innerText = fill; // for testing
        node.style.setProperty("--fill", fill);
        node.style.setProperty("--fill-percentage", fill * 100 + "%");
        node.dispatchEvent(new CustomEvent("fill", { detail: { fill } }));
        handleMouseup();
        checkShouldFire();
      }, miliSteps);
    }
  };
  const handlePause = () => {
    clearTimeout(timer);
    node.dispatchEvent(new CustomEvent("pause", { detail: {} }));
  };

  onMount(() => {
    node.style.setProperty("--fill", 0);
  });

  const data = derived([focus, focusLost], ([$focus, $focusLost]) => {
    return [$focus, $focusLost];
  });
  const unsubscribe = data.subscribe((data) => {
    const [$focus, $focusLost] = data;
    // @ts-ignore
    const [x, y] = [$focus.x, $focus.y];
    // 		console.log({x, y});

    if ($focusLost) {
      // Do not activate anything if focus is lost, pause buttons
      handlePause();
      status = "pause";
      return;
    } else {
      // play again if was paused and focus is attained again
      if (status === "pause") {
        node.dispatchEvent(new CustomEvent("look"));
        handleMousedown();
        // 				console.log('look');
        status = "look";
      }
    }

    const e = node.getBoundingClientRect();

    const hover = x > e.x && x < e.x + e.width && y > e.y && y < e.y + e.height;

    if (hover) {
      if (status !== "look") {
        node.dispatchEvent(new CustomEvent("look"));
        handleMousedown();
        // 				console.log('look');
        status = "look";
      }
    } else {
      if (status !== "lookaway") {
        node.dispatchEvent(new CustomEvent("lookaway"));
        handleMouseup();
        // 				console.log('lookaway');
        status = "lookaway";
      }
    }

    node.dispatchEvent(new CustomEvent("change", { detail: { hi: "hello" } }));
  });

  return {
    destroy() {
      unsubscribe();
      clearTimeout(timer);
    },
  };
}
