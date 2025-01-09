<script>
  import { t } from "../helpers/i18n";
  import IconNext from "../icons/IconNext.svelte";
  import { hasCalibrated } from "../stores/calibrationStore";
  import { startGazeCloud } from "../stores/cloudgazerStore";
  import { currentPage } from "../stores/pageStore";
</script>

<div class="container">
  <img src="/allow-camera.gif" alt="" />

  <h1>{$t("deined.please-allow")}</h1>

  <p class="text-ratz">{$t("deined.reason")}</p>

  <button
    class="clickable-button hollow"
    on:click={() => {
      if ($hasCalibrated) {
        $currentPage = "book";
      } else {
        startGazeCloud();
        $currentPage = "calibration";
      }
    }}
  >
    <IconNext />
    {$t("deined.try-again")}
  </button>

  <div class="not-recording">
    {@html $t("deined.not-recording")}
  </div>
</div>

<style lang="scss">
  .container {
    min-height: 100vh;
    text-align: center;
    background: var(--blue);
    color: var(--white);
    // display: flex;
    padding-top: 6vh;
    // align-items: center;
    // justify-content: center;
    .inside {
      padding: 2em;
    }
    img {
      margin: 10vh 0 0;
      max-width: 30vh;
      border-radius: 0.6em;
      overflow: hidden;
      box-shadow: 0 0.4em 1.2em rgba(0, 0, 0, 0.3);
    }

    h1 {
      color: inherit;
      margin: 7vh 0 0;
      font-size: 2.3em;
    }
    p {
      text-transform: initial;
      margin: 0.4em 0 8vh;
      padding: 0 3em;
      font-size: 2.25em;
      height: 3em;
    }

    .not-recording {
      font-size: 1.5em;
      margin-top: 20vh;
      font-variation-settings: "wght" 400, "wdth" 100;
    }

    margin: 0;

    font-variation-settings: "wght" 700, "wdth" 100;

    font-family: var(--narkiss-block);
    font-style: normal;
    // font-size: 2em;
    text-align: center;
    margin: 0 auto;
    text-transform: lowercase;
    font-feature-settings: "smcp";
    line-height: 1.5;
  }
</style>
