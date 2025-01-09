<script>
  import { rtl } from "../../1.1/helpers/i18n";
  import { debugMode } from "../../../bookStore";

  import { focus, screenH, screenW } from "../../../positionStore";

  import {
    avarageWordInPixels,
    chapterScrolledPixels,
    chapterWidth,
  } from "../../../tempStore";

  let el;
  let left;
  let width;
  let hasRead;
  $: {
    // console.log({ el.offsetLeft });
    if (el) {
      width = el.offsetWidth;
      left = el.offsetLeft;
      if ($rtl) {
        hasRead =
          $chapterWidth -
          left -
          width -
          $chapterScrolledPixels -
          ($screenW - $focus.x) +
          100;
      } else {
        hasRead = $chapterScrolledPixels - left + $focus.x - 100;
      }
      // ($screenW - $mouse.x) * 0.8 + ($screenH * 0.6)
      // ($screenH / 3) * 1.2
    }
  }
  $: halfBold = $rtl
    ? hasRead - $avarageWordInPixels * 1.5 < 0 &&
      !(hasRead + $avarageWordInPixels * 1.5 < 0)
    : hasRead - $avarageWordInPixels * 2 < 0 &&
      !(hasRead + $avarageWordInPixels * 2 < 0);

  $: bold = $rtl
    ? hasRead - $avarageWordInPixels / 2 < 0 &&
      !(hasRead + ($avarageWordInPixels / 2) * 1.1 < 0)
    : hasRead + $avarageWordInPixels / 2 > 0 &&
      !(hasRead - $avarageWordInPixels / 2 > 0);

  
</script>

<span
  class="word"
  class:ltr={!$rtl}
  bind:this={el}
  data-width={$debugMode ? width : false}
  data-left={$debugMode ? left : false}
  data-hasRead={$debugMode ? hasRead : false}
  class:half-bold={$rtl ? halfBold : false}
  class:bold={$rtl ? bold : false}
>
  <slot />
</span>

<style lang="scss">
  span.word {
    transition: font-variation-settings 600ms ease;
    will-change: font-variation-settings;
    font-variation-settings: "wght" 400, "opsz" 8;
    &.half-bold {
      font-variation-settings: "wght" 550, "opsz" 8;
    }
    &.bold {
      font-variation-settings: "wght" 700, "opsz" 8;
    }
    &.ltr {
      // font-variation-settings: "opsz" 41, "GRAD" -50;
      font-variation-settings: "opsz" 48, "GRAD" -50;
      font-stretch: 80%;
      font-weight: 400;
      font-optical-sizing: auto;
      &.half-bold {
        font-variation-settings: "opsz" 48, "GRAD" 25;
        font-stretch: 80%;
        font-weight: 400;
        font-optical-sizing: auto;
      }
      &.bold {
        font-variation-settings: "opsz" 48, "GRAD" 100;
        font-stretch: 80%;
        font-weight: 400;
        font-optical-sizing: auto;
      }
    }
  }
</style>
