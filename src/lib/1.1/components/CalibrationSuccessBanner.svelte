<script>
  import {
    hasLostEyeContact,
    inactiveSeconds,
    secondsToHardReload,
    secondsToSoftReload,
  } from "../../../activenessStore";
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
  import { cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import {
    currentChapterIndex,
    goToChapter,
    restart,
  } from "../../../chapterStore";
  import {
    hasCalibrated,
    showClibrationBanner,
  } from "../stores/calibrationStore";
  import { t } from "../helpers/i18n";
  import { stare } from "../helpers/stare";
  import { isProduction } from "../../../bookStore";
  import { onMount } from "svelte";

  let controlsLayout = [
    "previousFrame",
    "playpause",
    "stop",
    "nextFrame",
    "progress",
    "frame",
    "loop",
    "spacer",
    "background",
    "snapshot",
    "zoom",
    "info",
  ];
  let lottie;

  // $: {
  //   if ($showClibrationBanner) {
  //     if (lottie) {
  //       lottie.setDirection(1);
  //       lottie.play();
  //     }
  //   } else {
  //     if ($showClibrationBanner) {
  //       lottie.setDirection(-1);
  //       lottie.play();
  //     }
  //   }
  // }

  onMount(() => {
    lottie.seek(24);
    lottie.setDirection(-1);
    lottie.play();
  });
</script>

{#if $showClibrationBanner}
  <div class="center">
    <div
      class="container"
      out:fade={{ duration: 500, easing: cubicOut, delay: 0 }}
      in:fade={{ duration: 500, easing: cubicOut, delay: 0 }}
    >
      <div class="icon" on:click={() => {}}>
        <!-- autoplay={true} -->
        <LottiePlayer
          bind:this={lottie}
          src="/lottiefiles/visibilityV2.json"
          renderer="svg"
          background="transparent"
        />
      </div>
      <h1>
        <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 0 }}>
          {$t("success.title")}
        </span>

        <!-- {#if $hasLostEyeContact}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 0 }}
            >איבדנו קשר עין</span
          >
        {:else}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 0 }}
            >קשר העין התחדש</span
          >
        {/if} -->
      </h1>

      <p class="text-ratz2">
        <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 300 }}>
          {@html $t("success.text")}
        </span>
      </p>

      <button
        class="starable"
        use:stare={isProduction ? 2000 : 300}
        on:stare={() => ($showClibrationBanner = false)}
      >
        {$t("success.action")}
        <div class="line">
          <div class="stare-bg" />
          <div class="stare-fill" />
        </div>
      </button>
    </div>
  </div>
{/if}

<style lang="scss">
  .center {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--black);
    z-index: 99999999;
  }
  .container {
    backdrop-filter: blur(0.5em);
    z-index: 9;
    border-radius: 4vh;
    padding: 5vh 6vh 3vh;
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.04),
      0 0.5em 1em rgba(0, 0, 0, 0.04), 0 0.8em 3em rgba(0, 0, 0, 0.04),
      0 1.5em 10em rgba(0, 0, 0, 0.04);
    font-family: var(--narkiss-block);
    text-align: center;
    max-width: 30em;
    min-width: 35em;
    span {
      display: inline-block;
    }
    h1 {
      color: inherit;
      font-size: 3em;
      /* color: var(--blue); */
      line-height: 0.9;
      margin: 0 auto 0.6em;
      padding: 0;
      max-width: initial;
      font-variation-settings: "wght" 600;
    }
    .icon {
      width: 15vh;
      height: 15vh;
      margin: 0 auto;
    }
    p {
      color: var(--active);
      margin: 0.5em auto 0;
      font-size: 1.8em;
      line-height: 1.2;
    }
    button {
      border: 0;
      padding: 2.3em 0 1em;
      display: block;
      width: 100%;
      white-space: nowrap;

      font-family: var(--narkiss-block);
      font-size: 1.8em;
      font-variation-settings: "wght" 700, "wdth" 100;
      color: var(--active);
      text-transform: lowercase;
      font-feature-settings: "smcp";

      position: relative;
      cursor: pointer;
      --fill: 0;
      background: none;
      .line {
        margin-top: 0.7em;
        height: 0.3em;
        position: relative;
        display: block;
        width: 100%;
        background: var(--inactive);
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
        transform: scaleY(0.4) scaleX(var(--fill));
        transition: all 300ms ease;
      }
    }
  }
</style>
