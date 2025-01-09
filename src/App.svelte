<script lang="ts">
  import Controller from "./lib/Controller.svelte";
  import Debugger from "./lib/Debugger.svelte";
  import Shortcuts from "./lib/Shortcuts.svelte";
  import Book from "./lib/Book.svelte";
  import { debugMode } from "./bookStore";
  import { webgazerInitiated } from "./lib/1.1/stores/webgazerStore";
  import SideNavigationArrows from "./lib/components/SideNavigationArrows.svelte";
  import BottomNav from "./lib/components/BottomNav.svelte";
  import ProgressBar from "./lib/components/ProgressBar.svelte";
  import LoadFromLocalStorage from "./lib/components/LoadFromLocalStorage.svelte";
  import Activeness from "./lib/Activeness.svelte";
  import TopHeader from "./lib/components/TopHeader.svelte";
  import { currentPage, isTopNavOpen } from "./lib/1.1/stores/pageStore";
  import WelcomePage from "./lib/1.1/pages/WelcomePage.svelte";
  import Header from "./lib/1.1/components/Header.svelte";
  import IntroductionPage from "./lib/1.1/pages/IntroductionPage.svelte";

  import { locale, locales, fadeTranslation, t } from "./lib/1.1/helpers/i18n";
  import AutohideCursor from "./lib/1.1/modules/AutohideCursor.svelte";
  import CalibrationSuccessBanner from "./lib/1.1/components/CalibrationSuccessBanner.svelte";
  import { hasLostEyeContact } from "./activenessStore";
  import Fader from "./lib/1.1/components/Fader.svelte";
  import TopNav from "./lib/1.1/components/TopNav.svelte";
  import AboutPage from "./lib/1.1/pages/AboutPage.svelte";
  import SharePage from "./lib/1.1/pages/SharePage.svelte";
  import HelpPage from "./lib/1.1/pages/HelpPage.svelte";
  import FeedbackPage from "./lib/1.1/pages/FeedbackPage.svelte";
  import { add_styles } from "svelte/internal";
  import MobileNotice from "./lib/1.1/pages/MobileNotice.svelte";
  import PleaseAllowCamera from "./lib/1.1/pages/PleaseAllowCamera.svelte";
  import Preloader from "./lib/1.1/helpers/Preloader.svelte";

  let w;
  $: isMobile = false;
</script>

<svelte:head>
  {#if $hasLostEyeContact}
    <link rel="icon" href="/favicon-no.png" />
  {:else}
    <link rel="icon" href="/favicon-yes.png" />
  {/if}
  <title>{$t("website.title")}</title>
  <meta name="description" content={$t("website.description")} />
  <meta property="og:site_name" content={$t("website.title")} />
  <meta property="og:title" content={$t("website.title")} />
  <meta property="og:image:alt" content={$t("website.description")} />

  {#if isMobile}
    <meta name="theme-color" content="#1500fa" />
  {:else}
    <meta name="theme-color" content="#fff" />
  {/if}
</svelte:head>

<svelte:window bind:innerWidth={w} />

<Controller>
  {#if isMobile}
    <MobileNotice />
  {:else if $currentPage === "denied"}
    <PleaseAllowCamera />
  {:else}
    <Header />
    <TopNav />
    <AutohideCursor />
    <Preloader />

    {#if $currentPage === "welcome"}
      <WelcomePage />
    {/if}
    {#if $currentPage === "introduction"}
      <IntroductionPage />
    {/if}
    {#if $currentPage === "about"}
      <AboutPage />
    {/if}
    {#if $currentPage === "feedback"}
      <FeedbackPage />
    {/if}
    {#if $currentPage === "share"}
      <SharePage />
    {/if}
    {#if $currentPage === "help"}
      <HelpPage />
    {/if}
    {#if $currentPage === "book" && !$isTopNavOpen}
      <Book />
      <SideNavigationArrows />
      <!-- <TopHeader /> -->
      <BottomNav />
      <ProgressBar />
      <CalibrationSuccessBanner />
      <Activeness />
    {/if}
  {/if}
</Controller>

{#if !isMobile}
  {#if $debugMode}
    <Debugger />
  {/if}

  <Shortcuts />
  <LoadFromLocalStorage />
  <Fader />
{/if}

<style lang="scss">
  :root {
    --white: #fff;
    --black: rgb(0, 0, 0);
    --progressbar-color: hsl(0, 0%, 65%);
    --blue: #1500fa;
    --active: #656565;
    --inactive: #b9b9b9;
    --narkiss-block: "NarkissBlock-VF";
    --narkiss-text: "NarkissText-VF";
    --roboto-serif: "Roboto Serif";
    --roboto-sans: "Roboto";
  }
  // gazecloud api overrides the font, so this fixes it
  :global {
    html,
    body {
      /* font-family: var(--narkiss-text), arial, sans-serif; */
    }
    #app {
      direction: rtl;
      font-family: var(--narkiss-text), arial, sans-serif;
      font-variation-settings: "opsz" 8;
    }
  }
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,700;1,900&display=swap");
  /* @import url("https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,100;8..144,200;8..144,300;8..144,400;8..144,500;8..144,600;8..144,700;8..144,800;8..144,900&display=swap"); */
  @font-face {
    font-family: "Roboto Serif";
    font-style: normal;
    font-weight: 100 1000;
    font-stretch: 100%;
    font-display: swap;
    // font-stretch: 1% 500%; /* Required by Chrome */
    font-stretch: 80%; /* Required by Chrome */
    src: url("./assets/Roboto_Serif/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf")
      format("truetype-variations");
  }
  @font-face {
    font-family: "NarkissBlock-VF";
    src: url("./assets/NarkissBlock-VF.ttf") format("truetype-variations");
    font-weight: 400 700 900;
    font-display: block;
  }
  @font-face {
    font-family: "NarkissText-VF";

    src: url("./assets/NarkissTextVariableELADGX.ttf")
      format("truetype-variations");
    font-weight: 400 700;
    font-variation-settings: "opsz" 8;
    font-display: block;
  }

  :global {
    html {
      overflow: hidden;
      height: 100vh;
      // fixes odd bottom-nav scrolling...
    }
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    #app {
      .clickable-button {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding: 0.2em 0.6em;
        font-family: var(--narkiss-block);
        font-size: 1.2em;
        font-variation-settings: "wght" 500, "wdth" 100;
        border-radius: 0.3em;
        background-color: var(--white);
        border: var(--blue) 3px solid;
        color: var(--blue);
        transition: all 200ms ease;
        gap: 0.5em;
        cursor: pointer;
        svg {
          font-size: 1.3em;
          width: 1em;
          height: 1em;
          &.flip-vertical {
            transform: scaleX(-1);
          }
        }
        &:hover {
          background-color: var(--blue);
          color: var(--white);
        }
        text-transform: lowercase;
        font-feature-settings: "smcp";
        &.hollow {
          background-color: var(--blue);
          color: var(--white);
          border-color: var(--white);
          border-width: 2px;
          &:hover {
            background-color: var(--white);
            color: var(--blue);
          }
        }
      }
      .link {
        border: 0;
        padding: 0.2em 0.6em;
        font-family: var(--narkiss-block);
        font-size: 1.2em;
        background: none;
        text-transform: lowercase;
        font-feature-settings: "smcp";
        color: var(--blue);
        &.gray {
          color: var(--active);
        }
      }

      .text-ratz {
        font-family: var(--narkiss-text) !important;
        font-style: normal;
        font-weight: 400;
        font-variation-settings: "opsz" 8;
        line-height: 1.2;
        &.ltr {
          font-family: var(--roboto-serif);
          font-feature-settings: "pnum" on, "lnum" on;
          font-variation-settings: "opsz" 41, "GRAD" -50;
          strong {
            font-variation-settings: "opsz" 41, "GRAD" 100;
          }
        }
      }
      .controller {
        .caps {
          text-transform: lowercase;
          font-feature-settings: "smcp";
        }
        &.ltr {
          .text-ratz {
            font-family: var(--roboto-serif);
            font-feature-settings: "pnum" on, "lnum" on;
            font-variation-settings: "opsz" 41, "GRAD" -50;
            strong {
              font-variation-settings: "opsz" 41, "GRAD" 100;
            }
          }
        }
      }

      // h1 {
      //   font-family: var(--narkiss-block);
      //   color: var(--blue);
      //   text-transform: uppercase;
      //   font-size: 4rem;
      //   font-variation-settings: "wght" 900, "wdth" 100;
      //   line-height: 1.1;
      //   margin: 2rem auto;
      //   max-width: 14rem;
      // }
      display: contents;
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      @media (min-width: 480px) {
        h1 {
          max-width: none;
        }

        p {
          max-width: none;
        }
      }
    }
    button#_ButtonCalibrateId {
      background: var(--blue);
      font-variation-settings: "wght" 500, "wdth" 100;

      font-family: var(--narkiss-block);
      font-style: normal;
      font-size: 1.2em;
      letter-spacing: 0.05em;
      text-align: center;
      margin: 0 auto;
      line-height: 1.3;
      text-transform: lowercase;
      font-feature-settings: "smcp";
      img {
        filter: invert(1);
      }
    }
  }
</style>
