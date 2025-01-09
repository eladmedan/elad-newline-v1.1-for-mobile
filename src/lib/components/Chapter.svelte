<script>
  import {
    avarageWordInPixels,
    chapterArrowWidth,
    chapterScrolledPixels,
    chapterWidth,
    currentBookPercentage,
    currentChapterPercentage,
  } from "../../tempStore";

  import { onDestroy, onMount } from "svelte";

  import { fly } from "svelte/transition";
  import { selectedWpm } from "../../wpmStore";
  import { shouldPlay } from "../../statesStore";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { screenH, screenW } from "../../positionStore";
  import {
    currentChapterIndex,
    isMovingChapters,
    nextChapter,
  } from "../../chapterStore";
  import Paragraph from "./Chapter/Paragraph.svelte";
  import Word from "./Chapter/Word.svelte";
  import { sexyDuration } from "../../percentagePositionsStore";
  import { hasLostEyeContact } from "../../activenessStore";
  import { styleSidesStyleNumber } from "../../keyboardStore";
  import { book, totalWordsInBook } from "../../bookStore";
  import { rtl } from "../1.1/helpers/i18n";
  import { stare } from "../1.1/helpers/stare";

  export let chapter;

  onMount(() => {
    // reset positions on new chapter
    $chapterScrolledPixels = 0;
    $sexyPixels = 0;

    calculateAvarageWordInPixels();
    initiateMovement();
  });

  function calculateAvarageWordInPixels() {
    const words = document.getElementsByClassName("word");
    let totalWidthPixels = 0;
    Array.from(words).forEach((word) => {
      // @ts-ignore
      totalWidthPixels += word.offsetWidth;
      // console.log('totalWidthPixels', totalWidthPixels);
    });
    $avarageWordInPixels = totalWidthPixels / words.length;
  }

  $: {
    // $currentChapterPercentage =
    //   ($chapterScrolledPixels /
    //     ($chapterWidth - $screenH / 2 - $chapterArrowWidth / 3)) *
    //   100;
    $currentChapterPercentage =
      ($chapterScrolledPixels /
        ($chapterWidth - $screenH / 1.5 - $chapterArrowWidth)) *
      100;
  }
  $: {
    let passedChapters = $book.chapters.slice(0, $currentChapterIndex);
    let passedChaptersWords = passedChapters.reduce(
      (acc, chapter) => acc + chapter.totalWords,
      0
    );
    let passedWordsForCurrentChapter = Math.ceil(
      (chapter.totalWords / 100) * $currentChapterPercentage
    );
    // console.log({ passedChaptersWords, passedWordsForCurrentChapter });

    $currentBookPercentage =
      ((passedChaptersWords + passedWordsForCurrentChapter) /
        $totalWordsInBook) *
      100;
  }

  let sexyPixels = tweened($chapterScrolledPixels, {
    duration: $sexyDuration,
    easing: cubicOut,
  });

  let frame;

  function initiateMovement() {
    let lastTick = performance.now();

    function tick(nowish) {
      const delta = nowish - lastTick;
      lastTick = nowish;

      // console.log("delta", delta);
      // update(delta);
      render(delta);

      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
  }

  onDestroy(() => {
    window.cancelAnimationFrame(frame);
  });

  function render(delta) {
    if (!$shouldPlay) return;
    const pixelsPerSecond = ($selectedWpm / 60) * $avarageWordInPixels;
    let getPixelsToMove = (delta * pixelsPerSecond) / 1000;
    // console.log({ getPixelsToMove });
    $chapterScrolledPixels += getPixelsToMove;

    if ($chapterScrolledPixels <= 0) $chapterScrolledPixels = 0;
    // const maxPixels = $chapterWidth - $screenH / 2 - $chapterArrowWidth / 3;
    // const maxPixels = $chapterWidth - $screenH / 2 - $chapterArrowWidth / 2;
    const maxPixels = $chapterWidth - $screenH / 1.5 - $chapterArrowWidth;
    if ($chapterScrolledPixels > maxPixels) $chapterScrolledPixels = maxPixels;

    $sexyPixels = $chapterScrolledPixels;
  }

  $: {
    if ($chapterScrolledPixels === 0) {
      $sexyPixels = $chapterScrolledPixels;
    }
  }

  let timer;

  function handleMouseEnterNext() {
    console.log("handleMouseEnterNext");
    timer = setTimeout(() => {
      nextChapter();
      clearTimer();
    }, 2300);
  }
  function clearTimer() {
    console.log("clearTimer");
    clearTimeout(timer);
  }
</script>

<div
  class="chapter"
  class:styleSidesStyleNumber-0={$styleSidesStyleNumber === 0}
  class:styleSidesStyleNumber-1={$styleSidesStyleNumber === 1}
>
  <div
    class="content"
    class:ltr={!$rtl}
    style={`transform: translateX(${$sexyPixels * ($rtl ? 1 : -1)}px);`}
    bind:clientWidth={$chapterWidth}
    data-chapterScrolledPixels={$chapterScrolledPixels}
    data-chapterWidth={$chapterWidth}
  >
    <h2>
      <span
        class="number"
        in:fly={{ y: 20, duration: 700, easing: cubicOut, delay: 1000 }}
        >{chapter.title}
      </span>
      {" "}
      <span
        class="title"
        in:fly={{ y: 20, duration: 700, easing: cubicOut, delay: 1130 }}
        >{chapter.number}</span
      >
    </h2>
    {#each chapter.paragraphs as paragraph, i}
      {#each paragraph as line}
        <Paragraph>
          {#each line.split(" ") as word}<Word>{word}</Word>{/each}
        </Paragraph>
      {/each}
    {/each}
    <button
      class="next-chapter-arrow"
      use:stare
      on:stare={nextChapter}
      bind:clientWidth={$chapterArrowWidth}
      on:click={nextChapter}
      on:mouseenter={handleMouseEnterNext}
      on:mouseleave={clearTimer}
    >
      <span class="arrow arrow-1">&rsaquo;</span>
      <span class="arrow arrow-2">&rsaquo;</span>
    </button>
  </div>
</div>

<style lang="scss">
  .chapter {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 4.5vh;
    /* overflow: hidden; */
    /* -webkit-mask-image: linear-gradient(
      90deg,
      transparent,
      rgba(0, 0, 0, 1) 8%,
      rgba(0, 0, 0, 1) 92%,
      transparent
    ); */
    /* -webkit-mask-image: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.15) 20%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1) 70%,
      rgba(0, 0, 0, 0.15) 80%,
      rgba(0, 0, 0, 0.05)
    ); */
    &.styleSidesStyleNumber-0 {
      -webkit-mask-image: linear-gradient(
        -90deg,
        rgba(0, 0, 0, 0) 21.8%,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 1) 70%,
        rgba(0, 0, 0, 0) 78.2%
      );
    }
    &.styleSidesStyleNumber-1 {
      -webkit-mask-image: linear-gradient(
        -90deg,
        rgba(0, 0, 0, 0.05) 0%,
        rgba(0, 0, 0, 0.15) 20%,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 1) 70%,
        rgba(0, 0, 0, 0.15) 80%,
        rgba(0, 0, 0, 0.05)
      );
    }

    .content {
      position: relative;
      margin-inline-start: 0.7em;
      will-change: transform;
      h2 {
        position: absolute;
        overflow: hidden;
        top: 5.5vh;
        margin: 0;

        font-family: var(--narkiss-block);
        color: var(--blue);
        font-size: 4vh;
        font-variation-settings: "wght" 700, "wdth" 100;
        text-transform: lowercase;
        font-feature-settings: "smcp";
        line-height: 1.1;
        span {
          display: inline-block;
        }
        .number {
        }
        .title {
          /* &:before {
            content: " – ";
          } */
          font-variation-settings: "wght" 300, "wdth" 100;
        }
      }
      white-space: nowrap;
      :global {
        p {
          margin: 0;
          display: inline-block;
          color: var(--black);

          &:not(:last-of-type):after {
            display: inline-block;
            font-weight: 400;
            content: "|";
            padding: 0 0.5em;
            color: var(--blue);
          }
          span {
            &:not(:last-of-type):after {
              content: "\00A0"; /* &nbsp; */
            }
          }
        }
      }
      &.ltr {
        :global {
          p {
            font-family: var(--roboto-serif);
            font-family: 2em;

            font-feature-settings: "pnum" on, "lnum" on;
            font-variation-settings: "opsz" 41, "GRAD" -50;
          }
        }
      }

      .next-chapter-arrow {
        border: none;
        padding: 0em;
        margin: 0;
        font-size: 7.5vh;
        font-family: inherit;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        height: 4em;
        padding: 0 1.8em;
        margin-inline-start: -1em;
        background: none;
        z-index: 1;
        position: relative;
        color: var(--blue);
        span {
          display: inline-block;
          transition: transform 2300ms ease;
          will-change: transform;
          padding: 0;
        }
        &:hover {
          span {
            &.arrow-1 {
              transform: translateX(-0.175em);
            }
            &.arrow-2 {
              transform: translateX(0.175em);
            }
          }
        }
      }
    }
  }
</style>
