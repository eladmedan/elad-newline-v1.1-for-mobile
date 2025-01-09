<script>
  import Hider from "../components/layout/Hider.svelte";
  import { t, locale, locales, rtl } from "../helpers/i18n";
  import Marquee from "../modules/Marquee.svelte";
  import { startGazeCloud } from "../stores/cloudgazerStore";
  import { currentPage } from "../stores/pageStore";
  import { fly } from "svelte/transition";
  import IconEye from "../icons/IconEye.svelte";
  import IconNext from "../icons/IconNext.svelte";

  // Create a locale specific timestamp
  $: time = new Date().toLocaleDateString($locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let step = 1;
  let steps = 5;
</script>

<main class="introduction-page" class:ltr={!$rtl}>
  <!-- {#each [1, 2, 3, 4, 5] as step} -->
  {#key step}
    <h1 in:fly={{ y: 10 }}>{$t(`introduction.${step}.title`)}</h1>
    <p class="text-ratz" in:fly={{ y: 10, delay: 200 }}>
      {@html $t(`introduction.${step}.description`)}
    </p>
  {/key}
  <!-- {/each} -->

  <div class="buttons-part" in:fly={{ y: 10, delay: 700 }}>
    {#if step < steps}
      <button
        class="clickable-button"
        on:click={() => {
          step += 1;
        }}
      >
        <IconNext />
        {$t("introduction.next")}
      </button>
      <br />
      <button
        class="link gray"
        on:click={() => {
          startGazeCloud();
          $currentPage = "calibration";
        }}
      >
        {$t("introduction.skip")} >
      </button>
    {:else}
      <button
        class="clickable-button"
        on:click={() => {
          startGazeCloud();
          $currentPage = "calibration";
        }}
      >
        <IconEye />
        {$t("introduction.calibration")}
      </button>
    {/if}
  </div>

  <nav in:fly={{ y: 10, delay: 700 }}>
    <ul>
      {#each [...Array(steps)].map((_, i) => i + 1) as key}
        <li class:active={key === step}>
          <button on:click={() => (step = key)}>
            <span>{$t(`introduction.${key}.title`)}</span>
          </button>
        </li>
      {/each}
    </ul>
  </nav>

  <button
    in:fly={{ y: 10, delay: 700 }}
    class="link gray back"
    on:click={() => ($currentPage = "welcome")}
  >
    &lt; {$t("introduction.back")}
  </button>

  <!-- <p>{@html $t("homepage.welcome", { name: "Jane Doe" })}!</p>
  <p>{@html $t("homepage.time", { time })}!</p> -->
</main>

<style lang="scss">
  main {
    margin-top: 40vh;
    text-align: center;
  }
  :global {
    svg {
      font-size: 1em !important;
    }
  }
  .buttons-part {
    margin-top: 10vh;
    height: 4.6em;
  }
  .link.gray {
  }
  .link.back {
    display: inline-block;
    margin-top: 5vh;
  }
  .introduction-page {
    &.ltr {
      p {
        font-family: 2em;
        
        /* font-family: var(--roboto-serif);
        font-feature-settings: "pnum" on, "lnum" on;
        font-variation-settings: "opsz" 41, "GRAD" -50; */
      }
    }
  }
  p {
    // font-family: var(--roboto-serif);

    // font-size: 36px;
    // font-feature-settings: "pnum" on, "lnum" on;
    // font-variation-settings: "opsz" 41, "GRAD" -50;

    /* Narkiss Text (he)/Narkiss Text Body */
    /* font-family: var(--narkiss-text); */

    font-style: normal;
    font-weight: 400;
    color: var(--black);
    font-size: 2.25em;
    margin: 0;
    text-align: center;
    /* font-variation-settings: "opsz" 8; */
    position: relative;
    line-height: 1;
    :global {
      a {
        color: var(--blue);
        text-decoration: underline;
        border-bottom: none;
        &:hover {
          // display: inline-block;
          // transform: translateY(-0.03em);
        }
      }
      strong {
        font-weight: 500;
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
  nav {
    max-width: 60em;
    margin: 0 auto;
    margin-top: 12vh;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3em;
      list-style: none;
      border: 0;
      margin: 0;
      li {
        width: 100%;
        text-align: center;
        margin: 0;
        border: 0;
        padding: 0;
        list-style: none;
        button {
          border: 0;
          padding: 0.7em 0 0.9em;
          display: block;
          width: 100%;
          white-space: nowrap;

          font-family: var(--narkiss-block);
          font-size: 1em;
          font-variation-settings: "wght" 700, "wdth" 100;
          color: var(--blue);
          text-transform: lowercase;
          font-feature-settings: "smcp";

          position: relative;
          cursor: pointer;
          background: none;

          &:after,
          &:before {
            position: absolute;
            content: "";
            width: 100%;
            height: 0.2em;
            bottom: 0;
            border-bottom: 0.2em var(--inactive) solid;
            left: 0;
          }
          &:after {
            border-color: var(--blue);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }
          // background: none;
          span {
            display: block;
            transition: all 0.3s ease;
            transform: scale(0.5) translateY(2.5em);
            opacity: 0;
          }
        }
        &.active {
          button {
            span {
              transform: scale(1) translateY(0em);
              opacity: 1;
            }
            &:after {
              transform: scaleX(1);
            }
          }
        }
      }
    }
  }
</style>
