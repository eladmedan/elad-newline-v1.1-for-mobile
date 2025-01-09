<script lang="ts">
  import { onMount } from "svelte";
  import {
    webgazerInitiated,
    xprediction,
    yprediction,
  } from "../stores/webgazerStore";

  import { mouse } from "../../../positionStore";

  export let handleMouseMove;

  // import webgazer from 'webgazer/src/index.mjs';

  onMount(() => {
    // @ts-ignore
    webgazer
      .setGazeListener(function (data, elapsedTime) {
        if (data == null) {
          return;
        }
        $xprediction = data.x; //these x coordinates are relative to the viewport
        $yprediction = data.y; //these y coordinates are relative to the viewport

        $webgazerInitiated = true;
        $mouse.x = Number($xprediction);
        $mouse.y = Number($yprediction);
        console.log("$mouse.x", $mouse.x);
        console.log("$mouse.y", $mouse.y);

        handleMouseMove();

        console.log(elapsedTime); //elapsed time is based on time since begin was called
      })
      .begin();
  });
</script>

<!-- svelte-ignore missing-declaration -->

<!-- {$xprediction} | {$yprediction} -->
<style lang="scss">
  :global {
    .hide-webgazer {
      #webgazerVideoContainer {
        opacity: 0 !important;
        pointer-events: none;
      }
      #webgazerGazeDot {
        opacity: 0.1 !important;
        pointer-events: none;
      }
    }
  }
</style>
