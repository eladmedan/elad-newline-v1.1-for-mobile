<script>
  import { debugMode } from "../bookStore";

  import { onDestroy, onMount } from "svelte";
  import { styleSidesStyleNumber } from "../keyboardStore";
  import { hideWebgazer } from "./1.1/stores/webgazerStore";
  import { hideCloudgazer } from "./1.1/stores/cloudgazerStore";

  onMount(() => {
    window.addEventListener("keydown", downHandler);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", downHandler);
  });

  $: document.body.classList.toggle("hide-webgazer", $hideWebgazer);
  $: document.body.classList.toggle("hide-cloudgazer", $hideCloudgazer);

  function downHandler(e) {
    console.log("keydown e", e);

    if (e.code === "KeyW") {
      console.log("hideWebgazer", $hideWebgazer);
      $hideWebgazer = !$hideWebgazer;
      console.log("hideCloudgazer", $hideCloudgazer);
      $hideCloudgazer = !$hideCloudgazer;
    }

    if (e.code === "KeyD") {
      console.log("debugMode", $debugMode);
      $debugMode = !$debugMode;
    }

    if (e.code === "KeyO") {
      console.log("styleSidesStyleNumber", $styleSidesStyleNumber);
      if ($styleSidesStyleNumber === 0) $styleSidesStyleNumber = 1;
      else if ($styleSidesStyleNumber === 1) $styleSidesStyleNumber = 0;
    }
  }
</script>
