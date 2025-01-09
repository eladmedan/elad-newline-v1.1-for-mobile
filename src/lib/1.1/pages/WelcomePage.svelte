<script>
  import Hider from "../components/layout/Hider.svelte";
  import { t, locale, locales, rtl } from "../helpers/i18n";
  import IconEye from "../icons/IconEye.svelte";
  import Marquee from "../modules/Marquee.svelte";
  import { hasCalibrated } from "../stores/calibrationStore";
  import { startGazeCloud } from "../stores/cloudgazerStore";
  import { currentPage } from "../stores/pageStore";

  // Create a locale specific timestamp
  $: time = new Date().toLocaleDateString($locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<main class="welcome-page">
  <!-- <p>
    <select bind:value={$locale}>
      {#each locales as l}
        <option value={l}>{l}</option>
      {/each}
    </select>
  </p> -->

  <h1>{$t("navigation.title")}</h1>

  <Hider>
    <div class="marquee" class:ltr={!$rtl}>
      <Marquee
        direction={$rtl ? "right" : "left"}
        speed={35}
        pauseOnHover={true}
      >
        <p style={`direction: ${$rtl ? "rtl" : "ltr"}`}>
          {$t("welcome.description")}
        </p>
        <p style={`direction: ${$rtl ? "rtl" : "ltr"}`}>
          {$t("welcome.description")}
        </p>
        <p style={`direction: ${$rtl ? "rtl" : "ltr"}`}>
          {$t("welcome.description")}
        </p>
      </Marquee>
    </div>
  </Hider>

  <button
    class="clickable-button"
    on:click={() => {
      if($hasCalibrated) {
        $currentPage = "book";
      } else {
        $currentPage = "introduction";
      }
    }}
  >
    <IconEye />
    {$t("welcome.start")}
  </button>
  <!-- <p>{@html $t("homepage.welcome", { name: "Jane Doe" })}!</p>
  <p>{@html $t("homepage.time", { time })}!</p> -->
</main>

<style lang="scss">
  main {
    margin-top: 40vh;
    text-align: center;
    button {
      margin-top: 35vh;
    }
  }
  .marquee {
    direction: ltr;
    p {
      /* Narkiss Text (he)/Narkiss Text Body */
      font-family: var(--narkiss-text);
      font-style: normal;
      font-weight: 400;
      font-size: 2.25em;
      color: var(--black);
      margin: 0;
      text-align: center;
      font-variation-settings: "opsz" 8;
      position: relative;
      line-height: 1;
      &:after {
        vertical-align: middle;
        position: relative;
        width: 3px;
        height: 1.2em;
        display: inline-block;
        margin-inline-start: 0.5em;
        margin-inline-end: 0.5em;
        content: "";
        background-color: var(--blue);
      }
    }
    &.ltr {
      p {
        font-family: var(--roboto-serif);
        font-family: 2em;

        font-feature-settings: "pnum" on, "lnum" on;
        font-variation-settings: "opsz" 41, "GRAD" -50;
      }
    }
  }
  h1 {
    font-variation-settings: "wght" 700, "wdth" 100;

    font-family: var(--narkiss-block);
    font-style: normal;
    font-size: 2.3em;
    text-align: center;
    margin: 0 auto;
    text-transform: lowercase;
    font-feature-settings: "smcp";
    line-height: 1.5;

    color: #0000ff;
  }
</style>
