<script>
  import {
    nextChapStartPos,
    nextChapWidthPercent,
    prevChapStartPos,
    prevChapWidthPercent,
  } from "../../percentagePositionsStore";
  import { nextChapter, prevChapter } from "../../chapterStore";
  import { rtl } from "../1.1/helpers/i18n";

  import { stare } from "../1.1/helpers/stare";
  import { showClibrationBanner } from "../1.1/stores/calibrationStore";
</script>

{#if !$showClibrationBanner}
  <div>
    <button
      class="left"
      style={`width:${$rtl ? $nextChapWidthPercent : $prevChapWidthPercent}%;`}
      use:stare={2500}
      on:stare={() => {
        $rtl ? nextChapter() : prevChapter();
      }}
    >
      <span class="arrow arrow-1">&lsaquo;</span>
      <span class="arrow arrow-2">&lsaquo;</span>
    </button>
    <button
      class="right"
      style={`width:${!$rtl ? $nextChapWidthPercent : $prevChapWidthPercent}%;`}
      use:stare={2500}
      on:stare={() => {
        $rtl ? prevChapter() : nextChapter();
      }}
    >
      <span class="arrow arrow-1">&rsaquo;</span>
      <span class="arrow arrow-2">&rsaquo;</span>
    </button>
  </div>
{/if}

<style lang="scss">
  div {
    pointer-events: none;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    direction: ltr;
  }
  button {
    border: none;
    background: none;
    position: absolute;
    transform: translateY(-50%);
    color: var(--blue);
    font-size: 7.5vh;
    font-family: inherit;
    line-height: 0;
    width: 3em;
    height: 6em;
    --fill: 0;
    --fill-percentage: 0%;
    span.arrow {
      position: absolute;
      padding: 0 6vw;
      transition: transform 50ms ease-in-out;
    }
    // &.hover {
    //   span.arrow {
    //     transition-duration: 3000ms;
    //     transform: translateX(0) !important;
    //   }
    // }
    &.right {
      top: 50vh;
      right: 0;
      span.arrow {
        right: 0;
        &.arrow-1 {
          transform: translateX(calc((1 - var(--fill)) * 10vw));
        }
        &.arrow-2 {
          transform: translateX(calc((1 - var(--fill)) * 8vw));
        }
      }
    }
    &.left {
      top: 50vh;
      left: 0;
      span.arrow {
        left: 0;
        &.arrow-1 {
          transform: translateX(calc((1 - var(--fill)) * -10vw));
        }
        &.arrow-2 {
          transform: translateX(calc((1 - var(--fill)) * -8vw));
        }
      }
    }
  }
</style>
