<script>
  import { scale } from "svelte/transition";
  import { stare } from "../helpers/stare";
  import {
    fadeTranslation,
    fadeDuration,
    locale,
    locales,
  } from "../helpers/i18n";
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { currentPage, isTopNavOpen } from "../stores/pageStore";
  import { hasCalibrated } from "../stores/calibrationStore";

  let timeout;

  let showLang = true;

  $: {
    $locale;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      showLang = true;
    }, 2200);
  }

  onDestroy(() => {
    clearTimeout(timeout);
  });

  const go = () => {
    $fadeTranslation = true;
    setTimeout(() => {
      $currentPage = "about";
      $isTopNavOpen = true;
    }, fadeDuration);
  };

  const switchLang = () => {
    $fadeTranslation = true;
    setTimeout(() => {
      $locale = $locale === "he" ? "en" : "he";
    }, fadeDuration);
    showLang = false;
  };
</script>

{#if !$isTopNavOpen}
  <header class:hasCalibrated={$hasCalibrated}>
    <button
      class:pointer-none={!showLang}
      class="starable lang"
      use:stare={2200}
      on:stare={switchLang}
      on:click={switchLang}
      transition:fade={{ duration: 200 }}
    >
      <div class="svg-wrapper">
        <div class="text" class:reverse={$locale === "he"}>
          <span>עב</span>
          <span>EN</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg">
          <rect class="shape" height="100%" width="100%" />
        </svg>
      </div>
    </button>
    <button
      class:pointer-none={!showLang}
      class="starable menu"
      use:stare={3000}
      on:stare={go}
      on:click={go}
    >
      <div class="svg-wrapper">
        <div class="line line-1" />
        <div class="line line-2" />
        <div class="line line-3" />
      </div>
    </button>
    <!-- <p>
    <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
    </select>
  </p> -->
  </header>
{/if}

<style lang="scss">
  /* path {
    animation: stroke 5s linear alternate infinite;
  }

  @keyframes stroke {
    to {
      stroke-dashoffset: 776;
    }
  } */
  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    direction: ltr;
    display: flex;
    justify-content: space-between;
    --button-padding-bottom: 3em;
    --button-padding-side: 3em;
    &.hasCalibrated {
      --button-padding-side: 17em;
      --button-padding-bottom: 8em;
    }
    button {
      background: none;
      padding: 0;
      border: none;
      padding: 2.8em;
      &.pointer-none {
        pointer-events: none;
      }
      padding-block-end: var(--button-padding-bottom);
      &.lang {
        padding-inline-end: var(--button-padding-side);
        --fill: 0;
        .svg-wrapper {
          width: 4em;
          display: inline-block;
          height: 4em;
          font-size: 0.7em;
          position: relative;
        }
        svg {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .shape {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          stroke-width: 0.6em;
          fill: transparent;
          stroke: var(--blue);
          transition: stroke-dashoffset 0.1s ease-in-out;
          stroke-dashoffset: calc(calc(1 - var(--fill)) * 260);
        }
        .svg-wrapper:hover .shape {
          /* stroke-dashoffset: 0; */
        }
        .svg-wrapper:hover .text span {
          /* transform: translateX(-100%); */
          // transform: translateX(var(--fill) * -100%);
        }
        .text {
          color: black;
          font-size: 2em;
          font-variation-settings: "wght" 700;
          position: absolute;
          top: 0;
          color: var(--inactive);
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: var(--inactive) 0 0 0 0.16em inset;
          display: flex;
          font-family: var(--narkiss-block);
          overflow: hidden;
          align-items: center;
          span {
            transition: transform 0.1s ease-in-out;
            display: block;
            text-align: center;
            min-width: 100%;

            transform: translateX(calc(var(--fill) * -100%));
          }
          &:not(.reverse) {
            span:nth-child(2) {
              color: var(--blue);
            }
          }
          &.reverse {
            span:nth-child(1) {
              color: var(--blue);
            }
            :first-child {
            }
            span {
              order: 2;
              transform: translateX(calc(var(--fill) * 100% - 100%));
            }
          }
        }
      }
      &.menu {
        padding-inline-start: var(--button-padding-side);
        --fill: 0;

        .svg-wrapper {
          width: 2.9em;
          height: 2.5em;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .line {
            width: 100%;
            background: var(--inactive);
            height: 0.2em;
            position: relative;
            &:before {
              content: "";
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-color: var(--blue);
              transform: scaleX(0);
              transform-origin: left;
              transition: transform 50ms ease-in-out;
            }
            &.line-1:before {
              transform: scaleX(calc(min(1, var(--fill) * 1 * 3)));
            }
            &.line-2:before {
              transform: scaleX(calc(max(0, min(1, var(--fill) * 1 * 3 - 1))));
            }
            &.line-3:before {
              transform: scaleX(calc(max(0, min(1, var(--fill) * 1 * 3 - 2))));
            }
          }
        }
      }
    }
  }
</style>
