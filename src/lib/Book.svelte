<script>
  import { book } from "../bookStore";
  import Chapter from "./components/Chapter.svelte";
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import {
    currentChapterIndex,
    isGoingForward,
    isMovingChapters,
    restart,
    restartTimes,
  } from "../chapterStore";
  import { rtl } from "./1.1/helpers/i18n";

  const switchAmount = 360;
  const delay = 1000;
  // const delay = 700;
  // const switchAmount = 60;

  $: {
    $rtl;
    restart();
  }

  $: forward = $rtl ? $isGoingForward : !$isGoingForward;
</script>

<main>
  {#each $book.chapters || [] as chapter, index}
    {#if index === $currentChapterIndex}
      {#key $restartTimes}
        <div
          in:fly={forward
            ? { x: 0 - switchAmount, duration: 700, easing: cubicOut, delay }
            : { x: switchAmount, duration: 700, easing: cubicOut, delay }}
          out:fly={forward
            ? { x: switchAmount, duration: 700, easing: cubicIn, delay: 0 }
            : { x: 0 - switchAmount, duration: 700, easing: cubicIn, delay: 0 }}
        >
          <Chapter {chapter} />
        </div>
      {/key}
    {/if}
  {/each}
</main>

<style lang="scss">
  main {
    margin: 0 auto;
    position: relative;
    height: 100vh;
    /* width: 100vh; */


    :global {
      .content {
        padding-inline-start: 50vh !important;
      }
    }
  }
</style>
