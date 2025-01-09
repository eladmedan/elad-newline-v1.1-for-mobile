<script>
  import {
    hasLostEyeContact,
    inactiveSeconds,
    secondsToHardReload,
    secondsToSoftReload,
  } from "../activenessStore";
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
  import { cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { currentChapterIndex, goToChapter, restart } from "../chapterStore";
  import { onDestroy } from "svelte";
  import { t } from "./1.1/helpers/i18n";

  let interval;

  $: {
    clearTimeout(interval);
    interval = setTimeout(() => {
      $inactiveSeconds += 1;
    }, 1000);
  }

  $: {
    if ($inactiveSeconds === $secondsToSoftReload) {
      if ($currentChapterIndex !== 0) {
        goToChapter(0);
      } else {
        restart();
        // if on first chapter but not start, reload page.
        // location.reload();
        // goToChapter(1);
        // setTimeout(() => {
        //   goToChapter(0);
        // }, 5000);
        // $chapterScrolledPixels = 0;
      }
    }
  }

  $: {
    if ($inactiveSeconds === $secondsToHardReload) {
      location.reload();
    }
  }

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

  //   var hamburger = document.getElementById("hamburger");
  //   hamburger.addEventListener("click", function () {
  //     hamburger = !hamburger;
  //     if (hamburger) {
  //       console.log("Second Click");
  //       menu.setDirection(-1);
  //       menu.play();
  //     } else {
  //       console.log("First click");
  //       menu.setDirection(1);
  //       menu.play();
  //     }
  //   });

  $: {
    if ($hasLostEyeContact) {
      requestAnimationFrame(() => (showBanner = true));
      if (lottie) {
        lottie.setDirection(1);
        lottie.play();
      }
    } else {
      requestAnimationFrame(() => (showBanner = false));
      if (lottie) {
        lottie.setDirection(-1);
        lottie.play();
      }
    }
  }

  let showBanner = false;

  onDestroy(() => {
    clearTimeout(interval);
  });
</script>

{#if showBanner}
  <div class="center">
    <div
      class="lost-eye-contact"
      class:has-lost-eye-contact={$hasLostEyeContact}
      out:fade={{ duration: 500, easing: cubicOut, delay: 1700 }}
      in:fade={{ duration: 500, easing: cubicOut, delay: 0 }}
    >
      <h1>
        &nbsp;
        {#if $hasLostEyeContact}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 0 }}>
            <!-- איבדנו קשר עין -->
            {$t('activeness.lost-eye-contact')}
          </span>
          {:else}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 0 }}>
            <!-- קשר העין התחדש -->
            {$t('activeness.found-eye-contact')}
          </span>
        {/if}
      </h1>
      <div class="icon" on:click={() => {}}>
        <!-- autoplay={true} -->
        <LottiePlayer
          bind:this={lottie}
          src="/lottiefiles/visibilityV2.json"
          renderer="svg"
          background="transparent"
        />
      </div>

      <h2>
        {#if $hasLostEyeContact}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 150 }}>
            <!-- המכשיר לא מזהה את עינייך -->
            {$t("activeness.unable-to-track")}
          </span>
        {:else}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 150 }}>
            <!-- המכשיר מזהה את עינייך -->
            {$t("activeness.able-to-track")}
          </span>
        {/if}
      </h2>
      <p>
        {#if $hasLostEyeContact}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 300 }}>
            <!-- כדאי לשנות תנוחה<br />כך שעינייך יהיו מול המכשיר -->
            {@html $t("activeness.change-position")}
          </span>
        {:else}
          <span in:fly={{ y: 10, duration: 400, easing: cubicOut, delay: 300 }}>
            <!-- כדאי לשמור על התנוחה<br />שלך כדי למנוע נתק ביננו -->
            {@html $t("activeness.keep-position")}
          </span>
        {/if}
      </p>
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
    pointer-events: none;
    color: var(--black);
  }
  .lost-eye-contact {
    backdrop-filter: blur(0.5em);
    z-index: 9;
    border-radius: 4vh;
    padding: 5vh 6vh;
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.04),
      0 0.5em 1em rgba(0, 0, 0, 0.04), 0 0.8em 3em rgba(0, 0, 0, 0.04),
      0 1.5em 10em rgba(0, 0, 0, 0.04);
    font-family: var(--narkiss-block);
    text-align: center;
    min-width: 31vh;
    &:not(.has-lost-eye-contact) {
      h1 {
        color: var(--blue);
      }
    }
    span {
      display: inline-block;
    }
    h1 {
      color: inherit;
      font-size: 3.8vh;
      margin: 0 auto;
      padding: 0;
      max-width: initial;
      font-variation-settings: "wght" 600;
    }
    .icon {
      width: 15vh;
      height: 15vh;
      margin: 0 auto;
    }
    h2 {
      font-size: 2.5vh;
      margin: 0 0 0.5em 0;
      font-variation-settings: "wght" 600;
      opacity: 0.7;
      color: inherit;
    }
    p {
      opacity: 0.7;
      margin: 0.5em 0 0;
      font-size: 2.4vh;
      line-height: 1.2;
    }
  }
</style>
