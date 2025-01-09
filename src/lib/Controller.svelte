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

  import { isMovingChapters, nextChapter, prevChapter } from "../chapterStore";
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
    prevChapEndPos,
    prevChapStartPos,
    topHeaderHeight,
  } from "../percentagePositionsStore";
  import {
    mouse,
    Xpercent,
    screenW,
    screenH,
    isMouseInWindow,
    Ypercent,
    focusLost,
  } from "../positionStore";
  import {
    max_wpm,
    min_wpm,
    negetive_wpm,
    positive_wpm,
    selectedWpm,
  } from "../wpmStore";
  import { canNavigate, shouldPlay } from "../statesStore";
  import { onDestroy, onMount } from "svelte";
  import { debugMode, isProduction } from "../bookStore";
  import { hasLostEyeContact, wake } from "../activenessStore";
  import { webgazerInitiated } from "./1.1/stores/webgazerStore";
  import WebgazerController from "./1.1/gazers/WebgazerController.svelte";
  import CloudgazerController from "./1.1/gazers/CloudgazerController.svelte";
  import { rtl } from "./1.1/helpers/i18n";
  import { cloudgazerInitiated } from "./1.1/stores/cloudgazerStore";
  import { shouldHideCursor } from "./1.1/modules/AutohideCursor";
  import {
    hasCalibrated,
    showClibrationBanner,
  } from "./1.1/stores/calibrationStore";
  import { isTopNavOpen } from "./1.1/stores/pageStore";

  const mouseleave = (event) => {
    if (
      event.clientY <= 0 ||
      event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight
    ) {
      console.log("I'm out");
      $isMouseInWindow = false;
      if (!$isMouseInWindow) $shouldPlay = false;
    }
  };

  onMount(() => {
    document.addEventListener("mouseleave", mouseleave);
  });

  onDestroy(() => document.removeEventListener("mouseleave", mouseleave));

  function handleMouseMove(event) {
    // if (!$webgazerInitiated) {
    //   $mouse.x = event?.clientX || 0;
    //   $mouse.y = event?.clientY || 0;
    // }
    if (event?.clientX && event?.clientY) {
      $mouse.x = event.clientX;
      $mouse.y = event.clientY;
    }

    $isMouseInWindow = true;
    wake();

    $isHoverTopHeader = $Ypercent < $topHeaderHeight;

    $isHoverBottomNav = 100 - $Ypercent < $bottomNavHeight;

    $isHoverPrevChapter =
      $Xpercent >= $prevChapStartPos &&
      $Xpercent < $prevChapEndPos &&
      !$isHoverBottomNav &&
      !$hasLostEyeContact;

    $isHoverBackwardsHigh =
      $Xpercent >= $backwardsHighStartPos && $Xpercent < $backwardsLowStartPos;

    $isHoverBackwardsLow =
      $Xpercent >= $backwardsLowStartPos && $Xpercent < $breakStartPos;

    $isHoverBreak =
      $Xpercent >= $breakStartPos && $Xpercent < $forwardsLowStartPos;

    $isHoverForwardsLow =
      $Xpercent >= $forwardsLowStartPos && $Xpercent < $forwardsHighStartPos;

    $isHoverForwardsHigh =
      $Xpercent >= $forwardsHighStartPos && $Xpercent < $forwardsHighEndPos;

    $isHoverNextChapter =
      $Xpercent >= $nextChapStartPos &&
      $Xpercent < $nextChapEndPos &&
      !$isHoverBottomNav;
    !$hasLostEyeContact;

    // WPM Calculator

    if ($shouldPlay) {
      calculateWPM();
    }
  }

  $: {
    $shouldPlay =
      !$isTopNavOpen &&
      !$focusLost &&
      !$showClibrationBanner &&
      !$hasLostEyeContact &&
      !$isHoverBottomNav &&
      !$isHoverTopHeader &&
      !$isMovingChapters &&
      ($isHoverBackwardsHigh ||
        $isHoverBackwardsLow ||
        // $isHoverBreak ||
        $isHoverForwardsLow ||
        $isHoverForwardsHigh);

    $canNavigate =
      !$hasLostEyeContact &&
      !$isHoverBottomNav &&
      $isMouseInWindow &&
      !$isHoverTopHeader &&
      !$isMovingChapters;
  }

  function calculateWPM() {
    if ($isHoverBackwardsHigh) {
      const backwardsHigh =
        1 -
        ($Xpercent - $backwardsHighStartPos) /
          ($backwardsLowStartPos - $backwardsHighStartPos);
      $selectedWpm = backwardsHigh * ($min_wpm - $negetive_wpm) + $negetive_wpm;
    }
    if ($isHoverBackwardsLow) {
      const backwardsLow =
        1 -
        ($Xpercent - $backwardsLowStartPos) /
          ($breakStartPos - $backwardsLowStartPos);
      $selectedWpm = backwardsLow * $negetive_wpm;
    }
    if ($isHoverBreak) {
      $selectedWpm = 0;
    }
    if ($isHoverForwardsLow) {
      const forwardsLow =
        ($Xpercent - $forwardsLowStartPos) /
        ($forwardsHighStartPos - $forwardsLowStartPos);
      $selectedWpm = forwardsLow * $positive_wpm;
    }
    if ($isHoverForwardsHigh) {
      const ForwardsHigh =
        0 -
        ($Xpercent - $forwardsHighStartPos) /
          ($forwardsHighStartPos - $forwardsHighEndPos);
      $selectedWpm = ForwardsHigh * ($max_wpm - $positive_wpm) + $positive_wpm;
    }
  }

  function handleClick(event) {
    if ($isHoverNextChapter) {
      nextChapter();
    } else if ($isHoverPrevChapter) {
      prevChapter();
    }
  }
</script>

<div
  class="controller"
  style={`direction: ${$rtl ? "rtl" : "ltr"}`}
  class:rtl={$rtl}
  class:ltr={!$rtl}
  on:mousemove={handleMouseMove}
  on:click={handleClick}
  bind:clientWidth={$screenW}
  bind:clientHeight={$screenH}
  class:is-debugging={$debugMode}
  class:isHoverBottomNav={$isHoverBottomNav}
  class:hide-cursor={$shouldHideCursor}
>
  <!-- class:hide-cursor={!$debugMode && (isProduction || true)} -->
  <slot />
</div>

<!-- <WebgazerController {handleMouseMove} /> -->
<CloudgazerController {handleMouseMove} />

<style lang="scss">
  div {
    background-color: var(--white);
    width: 100%;
    height: 100%;
    overflow: hidden;
    --top-nav-height: 6em;
  }
</style>
