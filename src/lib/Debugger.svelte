<script>
  import {
    isHoverBackwardsHigh,
    isHoverBackwardsLow,
    isHoverBottomNav,
    isHoverBreak,
    isHoverForwardsHigh,
    isHoverForwardsLow,
    isHoverNextChapter,
    isHoverPrevChapter,
    isHoverTopHeader,
  } from "../hoverStore";

  import RangeSlider from "svelte-range-slider-pips";
  import {
    backwardsHighStartPos,
    backwardsLowStartPos,
    bottomNavHeight,
    breakStartPos,
    forwardsHighEndPos,
    forwardsHighStartPos,
    forwardsLowStartPos,
    nextChapEndPos,
    nextChapStartPos,
    nextChapWidthPercent,
    prevChapEndPos,
    prevChapStartPos,
    prevChapWidthPercent,
    sexyDuration,
    sliderPositions,
    topHeaderHeight,
  } from "../percentagePositionsStore";
  import {
    eye,
    focus,
    focusLost,
    isMouseInWindow,
    mouse,
    screenH,
    screenW,
    Xpercent,
    Ypercent,
  } from "../positionStore";
  import {
    avarageWordInPixels,
    chapterScrolledPixels,
    chapterWidth,
    currentBookPercentage,
    currentChapterPercentage,
  } from "../tempStore";
  import {
    max_wpm,
    min_wpm,
    negetive_wpm,
    positive_wpm,
    selectedWpm,
  } from "../wpmStore";
  import { shouldPlay } from "../statesStore";
  import { isMovingChapters } from "../chapterStore";
  import {
    hasLostEyeContact,
    inactiveSeconds,
    secondsToHardReload,
    secondsToLostEyes,
    secondsToSoftReload,
  } from "../activenessStore";
  import { book, isProduction, totalWordsInBook } from "../bookStore";
  import {
    startGazeCloud,
    stopGazeCloud,
    xprediction,
    yprediction,
  } from "./1.1/stores/cloudgazerStore";
  import { rtl } from "./1.1/helpers/i18n";
  import { eyeLost, hasCalibrated } from "./1.1/stores/calibrationStore";
  import { currentPage } from "./1.1/stores/pageStore";

  function handleChange(event) {
    console.log("new values: ", event.detail.values);
  }
</script>

<div id="debug-data">
  <span class="circle focus">The focus position is {$focus.x} x {$focus.y}</span
  >
  <span>focusLost: {$focusLost}</span>
  <span>hasCalibrated: {$hasCalibrated}</span>
  <span>eyeLost: {$eyeLost}</span>
  <span class="circle mouse">The mouse position is {$mouse.x} x {$mouse.y}</span
  >
  <span class="circle eye">The eye position is {$eye.x} x {$eye.y}</span>
  <span>screen: {$screenW} x {$screenH}</span>
  <span
    >XY percent: {Math.round($Xpercent * 10) / 10} x {Math.round(
      $Ypercent * 10
    ) / 10}
  </span>
  <span>avarage word in pixels: {$avarageWordInPixels}</span>
  <span>chapterScrolledPixels: {$chapterScrolledPixels}</span>
  <span>chapterWidth: {$chapterWidth}</span>

  <span>min_wpm: <input type="number" bind:value={$min_wpm} /></span>
  <span>negetive_wpm: <input type="number" bind:value={$negetive_wpm} /></span>
  <span>positive_wpm: <input type="number" bind:value={$positive_wpm} /></span>
  <span>max_wpm: <input type="number" bind:value={$max_wpm} /></span>
  <span>selectedWpm: {$selectedWpm}</span>
  <span>isMouseInWindow: {$isMouseInWindow}</span>
  <span>isMovingChapters: {$isMovingChapters}</span>
  <span>shouldPlay: {$shouldPlay}</span>
  <span
    >Chapters Words: {$book.chapters?.map(
      (chapter) => chapter.totalWords
    )}</span
  >
  <span>totalWordsInBook: {$totalWordsInBook}</span>
  <span>currentBookPercentage: {$currentBookPercentage}%</span>
  <span>currentChapterPercentage: {$currentChapterPercentage}%</span>
  <span>sexyDuration: <input type="number" bind:value={$sexyDuration} /></span>
  <span
    >secondsToLostEyes: <input
      type="number"
      bind:value={$secondsToLostEyes}
    /></span
  >
  <span
    >secondsToSoftReload: <input
      type="number"
      bind:value={$secondsToSoftReload}
    /></span
  >
  <span
    >secondsToHardReload: <input
      type="number"
      bind:value={$secondsToHardReload}
    /></span
  >
  <span
    >topHeaderHeight: <input
      type="number"
      bind:value={$topHeaderHeight}
    />%</span
  >
  <span
    >bottomNavHeight: <input
      type="number"
      bind:value={$bottomNavHeight}
    />%</span
  >
  <span>isHoverTopHeader: {$isHoverTopHeader}</span>
  <span>isHoverBottomNav: {$isHoverBottomNav}</span>
  <span>inactiveSeconds: {$inactiveSeconds}</span>
  <span>isProduction: {isProduction}</span>
  <span>hasLostEyeContact: {$hasLostEyeContact}</span>
  <span
    ><button
      on:click={() => {
        localStorage.removeItem("sliderPositionsV2");
        localStorage.removeItem("min_wpm");
        localStorage.removeItem("negetive_wpm");
        localStorage.removeItem("positive_wpm");
        localStorage.removeItem("max_wpm");
        localStorage.removeItem("bottomNavHeight");
        localStorage.removeItem("topHeaderHeight");
        localStorage.removeItem("sexyDuration");
        localStorage.removeItem("styleSidesStyleNumber");
        location.reload();
      }}>Clear localStorage & Restart</button
    ></span
  >
  <span>
    GazeCloudAPI:
    <button type="button" on:click={startGazeCloud}>Start</button>
    <button type="button" on:click={stopGazeCloud}>Stop</button>
  </span>
  <span>
    currentPage: 
    <strong style="width:7em; display:inline-block;">{$currentPage}</strong>
    <button type="button" on:click={() => ($currentPage = "book")}>book</button>
    <button type="button" on:click={() => ($currentPage = "introduction")}>introduction</button>
    
  </span>
</div>
<div id="range-slider">
  <RangeSlider
    pips
    float
    bind:values={$sliderPositions}
    min={0}
    step={0.5}
    pipstep={10}
    max={100}
    reversed={$rtl}
    on:change={handleChange}
  />
  {JSON.stringify($sliderPositions)}
</div>
<div id="visual-helpers" class:rtl={$rtl} class:ltr={!$rtl}>
  <div
    class="prev-chapter visualbox"
    style={`--xpercent:${$prevChapStartPos}%; width: ${$prevChapWidthPercent}%`}
    class:active={$isHoverPrevChapter}
  />
  <div
    class="backwards-high visualbox"
    style={`--xpercent:${$backwardsHighStartPos}%; width: ${
      $backwardsLowStartPos - $backwardsHighStartPos
    }%`}
    class:active={$isHoverBackwardsHigh}
  />
  <div
    class="backwards-low visualbox"
    style={`--xpercent:${$backwardsLowStartPos}%; width: ${
      $breakStartPos - $backwardsLowStartPos
    }%`}
    class:active={$isHoverBackwardsLow}
  />
  <div
    class="break visualbox"
    style={`--xpercent:${$breakStartPos}%; width: ${
      $forwardsLowStartPos - $breakStartPos
    }%`}
    class:active={$isHoverBreak}
  />
  <div
    class="forwards-low visualbox"
    style={`--xpercent:${$forwardsLowStartPos}%; width: ${
      $forwardsHighStartPos - $forwardsLowStartPos
    }%`}
    class:active={$isHoverForwardsLow}
  />
  <div
    class="forwards-high visualbox"
    style={`--xpercent:${$forwardsHighStartPos}%; width: ${
      $forwardsHighEndPos - $forwardsHighStartPos
    }%`}
    class:active={$isHoverForwardsHigh}
  />
  <div
    class="next-chapter visualbox"
    style={`--xpercent:${$nextChapStartPos}%; width: ${$nextChapWidthPercent}%`}
    class:active={$isHoverNextChapter}
  />
  <div
    class="bottom-nav visualbox"
    style={`height: ${$bottomNavHeight}%`}
    class:active={$isHoverBottomNav}
  />
  <div
    class="top-header visualbox"
    style={`height: ${$topHeaderHeight}%`}
    class:active={$isHoverTopHeader}
  />
  <div class="mousePointer" style="--x: {$mouse.x}px; --y: {$mouse.y}px" />
  <div class="eyePointer" style="--x: {$eye.x}px; --y: {$eye.y}px" />
  <div class="focusPointer" style="--x: {$focus.x}px; --y: {$focus.y}px" />
</div>

<style lang="scss">
  #range-slider {
    position: absolute;
    top: 65vh;
    width: 100%;
    right: 0;
    left: 0;
  }
  #debug-data {
    overflow: hidden;
    height: 100vh;
    display: block;
    font-family: monospace;
    direction: ltr;
    margin: 1em;
    position: absolute;
    z-index: 1;
    font-size: 0.8em;
    line-height: 1.1;
    padding-top: 13.5rem;
    top: 0;
    left: 0;
    span {
      display: block;
      &.circle {
        &:before {
          background: black;
          width: 0.8em;
          margin-inline-end: 0.4em;
          height: 0.8em;
          vertical-align: middle;
          content: "";
          display: inline-block;
          border-radius: 100%;
        }
        &.mouse:before {
          background: red;
        }
        &.eye:before {
          background: blue;
        }
      }
    }
  }
  #visual-helpers {
    pointer-events: none;
    position: absolute;
    width: 100%;
    right: 0;
    left: 0;
    height: 100%;
    top: 0;
    overflow: hidden;
    bottom: 0;
    &.rtl > div.visualbox {
      right: var(--xpercent);
    }
    &.ltr > div.visualbox {
      left: var(--xpercent);
      transform: scaleX(-1);
    }
    > div {
      position: absolute;
      opacity: 0.2;
      height: 100%;
      &:hover,
      &.active {
        opacity: 0.5;
      }
    }
    .bottom-nav {
      bottom: 0;
      width: 100%;
      background-color: red;
    }
    .top-header {
      top: 0;
      width: 100%;
      background-color: blue;
    }
    .prev-chapter {
      background-color: #f9c939;
    }
    .backwards-high {
      background: linear-gradient(
        90deg,
        rgba(0, 94, 255, 1) 0%,
        rgba(106, 0, 255, 1) 100%
      );
    }
    .backwards-low {
      background: linear-gradient(
        90deg,
        rgba(141, 252, 243, 1) 0%,
        rgba(46, 123, 255, 1) 100%
      );
    }
    .break {
      background: rgb(255, 255, 255);
    }
    .forwards-low {
      background: linear-gradient(
        90deg,
        rgba(46, 123, 255, 1) 0%,
        rgba(141, 252, 243, 1) 100%
      );
    }
    .forwards-high {
      background: linear-gradient(
        90deg,
        rgba(106, 0, 255, 1) 0%,
        rgba(0, 94, 255, 1) 100%
      );
    }
    .next-chapter {
      background-color: #f9c939;
    }
    .eyePointer,
    .mousePointer,
    .focusPointer {
      background: black;
      border-radius: 100%;
      --x: 0px;
      --y: 0px;
      transform: translate(var(--x), var(--y));
      position: absolute;
      z-index: 99999;
      $size: 30px;
      width: $size;
      height: $size;
      top: 0-$size / 2;
      left: 0-$size / 2;
      z-index: 99;
      opacity: 0.6;
    }
    .mousePointer {
      background: red;
    }
    .eyePointer {
      background: blue;
    }
    .focusPointer {
      // background: black;
      background: none;
      border: 2px solid black;
      margin: -2px;
    }
  }
  :global {
    #app {
      > .controller {
        &.hide-cursor {
          cursor: none !important;
          user-select: none;
          * {
            cursor: none !important;
          }
        }
        &.is-debugging {
          cursor: auto;
          .next-chapter-arrow {
            border: 1px solid !important;
          }

          .starable {
            outline: 1px solid black;
          }

          span.word {
            transition: none;
            &.half-bold {
              color: red;
            }
            &.bold {
              color: yellow;
            }
          }
        }
      }
    }
  }
</style>
