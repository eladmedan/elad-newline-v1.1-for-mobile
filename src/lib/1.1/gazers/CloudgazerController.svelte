<script lang="ts">
  import { debugMode } from "../../../bookStore";
  import { onDestroy, onMount } from "svelte";
  import {
    cloudgazerInitiated,
    xprediction,
    yprediction,
  } from "../../1.1/stores/cloudgazerStore";

  import { currentPage } from "../stores/pageStore";

  import { eye, mouse } from "../../../positionStore";
  import { eyeLost, hasCalibrated } from "../stores/calibrationStore";

  export let handleMouseMove;

  function PlotGaze(GazeData) {
    /*
      GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
      GazeData.docX // gaze x in document coordinates
      GazeData.docY // gaze y in document cordinates
      GazeData.time // timestamp
    */

    // console.log("GazeData", GazeData);

    if (GazeData.state !== 0) {
      $hasCalibrated = true;
      $eyeLost = true;
      return;
    }
    $xprediction = GazeData.docX; //these x coordinates are relative to the viewport
    $yprediction = GazeData.docY; //these y coordinates are relative to the viewport

    $cloudgazerInitiated = true;
    $hasCalibrated = true;
    $eyeLost = false;
    $eye.x = Number($xprediction);
    $eye.y = Number($yprediction);
    // console.log("$eye.x", $eye.x);
    // console.log("$eye.y", $eye.y);

    handleMouseMove();
  }

  const load = () => {
    GazeCloudAPI.OnCalibrationComplete = function () {
      $debugMode = false;
      console.log("gaze Calibration Complete");
      $currentPage = "book";
    };

    GazeCloudAPI.OnCamDenied = function () {
      console.log("camera access denied");
      requestAnimationFrame(() => {
        $currentPage = "denied";
      })
    };
    GazeCloudAPI.OnError = function (msg) {
      console.log("err: " + msg);
    };
    GazeCloudAPI.UseClickRecalibration = true;
    GazeCloudAPI.OnResult = PlotGaze;
  };

  onMount(() => {
    window.addEventListener("load", load);
  });
  onDestroy(() => {
    window.removeEventListener("load", load);
  });
</script>

<!-- svelte-ignore missing-declaration -->

<!-- {$xprediction} | {$yprediction} -->
<style lang="scss">
  :global {
    .hide-cloudgazer {
      #camid {
        display: none !important;
      }
      // #webgazerGazeDot {
      //   opacity: 0.1 !important;
      //   pointer-events: none;
      // }
    }
  }
</style>
