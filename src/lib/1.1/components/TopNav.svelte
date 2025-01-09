<script>
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { fadeDuration, fadeTranslation, rtl, t } from "../helpers/i18n";
  import { stare } from "../helpers/stare";
  import IconAbout from "../icons/IconAbout.svelte";
  import IconFeedback from "../icons/IconFeedback.svelte";
  import IconHelp from "../icons/IconHelp.svelte";
  import IconShare from "../icons/IconShare.svelte";
  import IconX from "../icons/IconX.svelte";
  import { hasCalibrated } from "../stores/calibrationStore";
  import { currentPage, isTopNavOpen } from "../stores/pageStore";
  import Li from "./Li.svelte";

  const go = () => {
    $fadeTranslation = true;
    setTimeout(() => {
      if ($hasCalibrated) {
        $currentPage = "book";
      } else {
        $currentPage = "welcome";
      }
      $isTopNavOpen = false;
    }, fadeDuration);
  };
</script>

{#if $isTopNavOpen}
  <div
    class="top-nav"
    class:reverse={!$rtl}
    class:hasCalibrated={$hasCalibrated}
    in:fly={{ y: -300, duration: 700, easing: cubicOut }}
    out:fly={{ y: -300, duration: 700, easing: cubicIn, opacity: 1 }}
  >
    <button class="x">
      <div class="starable extra" use:stare={2200} on:stare={go} on:click={go}>
        <!-- <IconX /> -->

        <div class="svg-wrapper">
          <div class="line line-1" />
          <div class="line line-2" />
        </div>
      </div>
    </button>
    <div class="title">
      <h1 class:ltr={!$rtl} class="text-ratz">{$t("navigation.title")}</h1>
      <h2>{$t("navigation.by")}</h2>
    </div>

    <ul>
      <Li page="about" title={$t("about.title")}>
        <IconAbout />
      </Li>
      <Li page="feedback" title={$t("feedback.title")}>
        <IconFeedback />
      </Li>
      <Li page="share" title={$t("share.title")}>
        <IconShare />
      </Li>
      <Li page="help" title={$t("help.title")}>
        <IconHelp />
      </Li>
    </ul>
  </div>
{/if}

<style lang="scss">
  .top-nav {
    position: absolute;
    top: 0;
    height: var(--top-nav-height);
    width: 100%;
    box-shadow: 0 0.25em 1em rgba(0, 0, 0, 0.25);
    background: var(--white);
    display: flex;
    gap: 1em;
    --extra: auto;
    &.hasCalibrated {
      --extra: 28vh;
    }
    z-index: 999999999;
    align-items: center;
    &.reverse {
      flex-direction: row-reverse;
    }
    .x {
      height: 100%;
      background: none;
      border: none;
      padding: 0.5em 2em 2em;
      direction: ltr;
      width: 7em;
      height: var(--extra);
      text-align: end;
      --fill: 0;
      .extra {
        box-sizing: border-box;
        padding: 2.3em;
        width: 18em;
        position: absolute;
        right: 0;
        top: 0;
        height: var(--extra);
        // background-color: red;
        // outline: 1px black solid;
      }

      .svg-wrapper {
        width: 3.5em;
        height: 2.6em;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        top: -0.6em;
        right: -0.9em;
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
            /* transform-origin: left; */
            transition: transform 50ms ease-in-out;
          }
          &.line-1 {
            transform: rotate(45deg);
            transform-origin: top left;
            &:before {
              transform: scaleX(var(--fill));
              /* transform: scaleX(calc(min(1, var(--fill) * 1 * 2))); */
            }
          }
          &.line-2 {
            transform: rotate(-45deg);
            transform-origin: bottom left;
            &:before {
              /* transform: scaleX(calc(max(0, min(1, var(--fill) * 1 * 2 - 1)))); */
              transform: scaleX(var(--fill));
            }
          }
        }
      }
    }
    .title {
      display: flex;
      flex-direction: column;
      h1 {
        color: var(--active);
        white-space: nowrap;
        margin: 0;
        font-size: 2.45em;
        line-height: 1;
        font-variation-settings: "wght" 700, "opsz" 8 !important;

        &.ltr {
          font-variation-settings: "opsz" 48, "GRAD" 0 !important;
          font-stretch: 80%;
          font-weight: 500 !important;
          font-size: 2.4em;
          font-optical-sizing: auto;
        }
      }
      h2 {
        color: var(--active);
        font-variation-settings: "wght" 400, "wdth" 100;

        font-family: var(--narkiss-block);
        font-style: normal;
        font-size: 1.12em;
        white-space: nowrap;
        text-align: center;
        margin: 0 auto 0.5em;
        text-transform: lowercase;
        font-feature-settings: "smcp";
        line-height: 0.6;
      }
    }
    ul {
      flex-grow: 1;
      width: 100%;
      margin: 0 auto;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
