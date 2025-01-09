<script>
  import { max_wpm, min_wpm, negetive_wpm, positive_wpm } from "../../wpmStore";
  import { onMount } from "svelte";
  import {
    bottomNavHeight,
    sexyDuration,
    sliderPositions,
    topHeaderHeight,
  } from "../../percentagePositionsStore";
  import { styleSidesStyleNumber } from "../../keyboardStore";

  let mounted = false;

  $: {
    if (mounted) {
      localStorage.setItem("sliderPositionsV2", $sliderPositions.toString());
      localStorage.setItem("min_wpm", $min_wpm.toString());
      localStorage.setItem("negetive_wpm", $negetive_wpm.toString());
      localStorage.setItem("positive_wpm", $positive_wpm.toString());
      localStorage.setItem("max_wpm", $max_wpm.toString());
      localStorage.setItem("bottomNavHeight", $bottomNavHeight.toString());
      localStorage.setItem("topHeaderHeight", $topHeaderHeight.toString());
      localStorage.setItem("sexyDuration", $sexyDuration.toString());
      localStorage.setItem(
        "styleSidesStyleNumber",
        $styleSidesStyleNumber.toString()
      );
    }
  }

  onMount(() => {
    if (localStorage.getItem("sliderPositionsV2")) {
      try {
        $sliderPositions = JSON.parse(
          `[${localStorage.getItem("sliderPositionsV2")}]`
        );
      } catch (error) {
        localStorage.removeItem("sliderPositionsV2");
      }
    }

    if (localStorage.getItem("min_wpm"))
      $min_wpm = Number(localStorage.getItem("min_wpm"));

    if (localStorage.getItem("negetive_wpm"))
      $negetive_wpm = Number(localStorage.getItem("negetive_wpm"));

    if (localStorage.getItem("positive_wpm"))
      $positive_wpm = Number(localStorage.getItem("positive_wpm"));

    if (localStorage.getItem("max_wpm"))
      $max_wpm = Number(localStorage.getItem("max_wpm"));

    if (localStorage.getItem("bottomNavHeight"))
      $bottomNavHeight = Number(localStorage.getItem("bottomNavHeight"));

    if (localStorage.getItem("topHeaderHeight"))
      $topHeaderHeight = Number(localStorage.getItem("topHeaderHeight"));

    if (localStorage.getItem("sexyDuration"))
      $sexyDuration = Number(localStorage.getItem("sexyDuration"));

    if (localStorage.getItem("styleSidesStyleNumber"))
      $styleSidesStyleNumber = Number(
        localStorage.getItem("styleSidesStyleNumber")
      );

    mounted = true;
  });
</script>
