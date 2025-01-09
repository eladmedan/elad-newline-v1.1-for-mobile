<script>
  import { rtl } from "../../1.1/helpers/i18n";
  import { debugMode } from "../../../bookStore";

  import { screenH, screenW } from "../../../positionStore";

  import { chapterScrolledPixels, chapterWidth } from "../../../tempStore";

  let el;
  let left;
  let width;
  let hasRead;
  $: {
    if (el) {
      // console.log({ left: el.offsetLeft });
      width = el.offsetWidth;
      left = el.offsetLeft;
      const extraOffset = $screenH * 0.08;

      if ($rtl) {
        hasRead =
          $chapterWidth -
          el.offsetLeft -
          width -
          $screenW / 2 -
          $chapterScrolledPixels -
          extraOffset;
      } else {
        hasRead =
          el.offsetLeft -
          $chapterScrolledPixels -
          $screenW / 2 -
          extraOffset;
      }
      // console.log({ hasRead: hasRead });
    }
  }
</script>

<p
  data-width={$debugMode ? width : undefined}
  data-left={$debugMode ? left : undefined}
  data-hasRead={$debugMode ? hasRead : undefined}
  bind:this={el}
  class:show={hasRead < 0}
>
  <slot />
</p>

<style lang="scss">
  p {
    opacity: 0;
    transition: opacity 1700ms ease;
    will-change: opacity;
    &.show {
      opacity: 1;
    }
  }
</style>
