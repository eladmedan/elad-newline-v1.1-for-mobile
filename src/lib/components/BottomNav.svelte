<script>
  import {
    currentChapterIndex,
    goToChapter,
    isMovingChapters,
  } from "../../chapterStore";
  import { bottomNavHeight } from "../../percentagePositionsStore";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import { book } from "../../bookStore";
  import { isHoverBottomNav } from "../../hoverStore";
  import { currentChapterPercentage } from "../../tempStore";
  import { stare } from "../1.1/helpers/stare";
  import { cloudgazerInitiated } from "../1.1/stores/cloudgazerStore";
  import { showClibrationBanner } from "../1.1/stores/calibrationStore";

  let hoverIndex = null;

  $: {
    if (!$isHoverBottomNav) hoverIndex = null;
  }

  let timer;

  function handleMouseEnterIndex(index) {
    console.log("handleMouseEnterIndex");
    hoverIndex = index;
    if ($currentChapterIndex === hoverIndex) return; // do nothing
    timer = setTimeout(() => {
      goToChapter(index);
      clearTimer();
    }, 3000);
  }
  function clearTimer() {
    hoverIndex = null;
    console.log("clearTimer");
    clearTimeout(timer);
  }
</script>

{#if ($isHoverBottomNav && !$isMovingChapters && !$showClibrationBanner) || false}
  <div
    class="bottom-nav"
    style="height:{$bottomNavHeight}%;"
    in:fly={{ y: 300, duration: 700, easing: cubicOut }}
    out:fly={{ y: 300, duration: 700, easing: cubicIn }}
  >
    <div class="flex">
      {#each $book.chapters || [] as chapter, index}
        <!-- on:mouseenter={() => handleMouseEnterIndex(index)}
      on:mouseleave={clearTimer} -->
        <div
          class:active={index === $currentChapterIndex}
          class:hover={hoverIndex === index}
          on:click={() => goToChapter(index)}
          use:stare={2000}
          on:look={() => (hoverIndex = index)}
          on:lookaway={() =>
            (hoverIndex = hoverIndex === index ? null : hoverIndex)}
          on:stare={() => goToChapter(index)}
        >
          <div class="number"><span>{chapter.title}</span></div>
          <div class="line" class:filled={$currentChapterIndex > index}>
            <div class="stare-bg" style:opacity={$currentChapterIndex === index ? 1 : undefined} />
            {#if $currentChapterIndex !== index}
              <div class="stare-fill" />
            {/if}
            <!-- {#if $currentChapterIndex === index}
              <div class="fill" style="width: {$currentChapterPercentage}%" />
              <div class="circle" style="right: {$currentChapterPercentage}%" />
            {:else if $cloudgazerInitiated}
              <div class="stare-fill" />
            {:else}
              <div class="fill2" />
            {/if} -->
          </div>
          <div class="title"><span>{chapter.number}</span></div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  .bottom-nav {
    position: absolute;
    width: 100%;
    bottom: 0;
    .flex {
      width: 80%;
      margin: 0 auto;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
      // gap: 2em;
      > div {
        --fill: 0;
        width: 100%;
        flex-grow: 1;
        display: inline-flex;
        flex-direction: column;
        height: 100%;
        font-family: var(--narkiss-block);
        justify-content: center;
        padding: 0 1em;
        cursor: pointer;
        span {
          display: block;
          transition: transform 700ms ease;
        }
        .number {
          font-variation-settings: "wght" 700;
          font-size: 2.2vh;

          padding-bottom: 0.35em;

          overflow: hidden;
          color: var(--blue);
          span {
            transform: translateY(2em);
          }
        }
        .title {
          font-variation-settings: "wght" 400;
          font-size: 1.93vh;
          overflow: hidden;
          padding-top: 0.3em;
          color: var(--blue);
          span {
            transform: translateY(-2em);
          }
        }
        .line {
          position: relative;
          height: 0.25em;
          &:before,
          .fill,
          .fill2,
          .stare-bg {
            transition: all 700ms ease;
          }
          &:before {
            background-color: var(--progressbar-color);
            height: 100%;
            content: "";
            display: block;
            position: absolute;
            width: 100%;
          }
          .fill {
            background-color: var(--blue);
            height: 100%;
            position: absolute;
            width: 100%;
          }
          .fill2 {
            transition-delay: 0ms;
            background-color: var(--white);
            height: 100%;
            position: absolute;
            width: 100%;
            transform: scaleY(0.7) scaleX(0);
          }
          .stare-bg {
            background-color: var(--blue);
            height: 100%;
            position: absolute;
            width: 100%;
            opacity: var(--fill);
          }
          .stare-fill {
            background-color: var(--white);
            height: 100%;
            position: absolute;
            width: 100%;
            transform: scaleY(0.7) scaleX(var(--fill));
            transition: all 300ms ease;
          }
          .circle {
            position: absolute;
            font-size: 1.3vh;
            height: 1em;
            width: 1em;
            background-color: var(--blue);
            top: -0.36em;
            margin-inline-start: -0.3em;
            border: 0.11em solid white;
            box-sizing: border-box;
            border-radius: 100%;
          }
          &.filled {
            &:before {
              background-color: var(--blue);
            }
          }
        }
        &.hover {
          .line {
            &:before,
            .fill,
            .stare-bg {
              transform: scaleY(2);
            }
            .fill2 {
              transform: scaleY(0.7) scaleX(1);
              transition-delay: 1000ms;
              transition-duration: 2400ms;
            }
          }
          .number,
          .title {
            span {
              transform: translateY(0);
            }
          }
        }
        &.active {
          /* .line {
            background-color: var(--blue);
          } */
          .title {
            font-variation-settings: "wght" 465;
          }
        }
      }
    }
  }
</style>
