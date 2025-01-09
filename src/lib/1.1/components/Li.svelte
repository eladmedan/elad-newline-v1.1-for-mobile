<script lang="ts">
  import { fade } from "svelte/transition";
  import { fadeDuration, fadeTranslation } from "../helpers/i18n";
  import { stare } from "../helpers/stare";

  import { currentPage, Pages } from "../stores/pageStore";

  export let page: Pages = "";
  export let title;

  export let go = () => {
    if (!page) return;
    if ($currentPage === page) return;
    $fadeTranslation = true;
    setTimeout(() => {
      $currentPage = page;
    }, fadeDuration);
  };
</script>

<li
  on:click={go}
  on:stare={go}
  use:stare={2000}
  class="starable"
  class:active={$currentPage === page}
>
  <div class="number">
    <slot />
    {#if title}
      <span>
        {title}
      </span>
    {/if}
  </div>
  <div class="line">
    <div class="stare-bg" />
    {#if $currentPage === page}
      <div class="fill" transition:fade={{ duration: page ? 600 : 0 }} />
    {:else}
      <div class="stare-fill" transition:fade={{ duration: page ? 600 : 0 }} />
    {/if}
  </div>
</li>

<style lang="scss">
  li {
    --fill: 0;
    width: 100%;
    flex-grow: 1;
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    font-family: var(--narkiss-block);
    justify-content: center;
    padding: 1.5em 1.5em;
    line-height: 1.4;
    text-align: center;
    border: 0 !important;
    position: relative;
    height: var(--extra);
    cursor: pointer;
    &.active {
      color: var(--blue);
    }
    .number {
      display: flex;
      gap: 0.5em;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.2em;
      span {
        transition: color 700ms ease;
      }
      font-variation-settings: "wght" 500;
      font-size: 2.5vh;
      white-space: nowrap;
      &:global {
        svg {
          width: 1.4em;
          height: 1.4em;
          display: inline-block;
        }
      }

      padding-bottom: 0.35em;

      span {
      }
    }
    .line {
      position: relative;
      height: 0.35em;
      &:before,
      .fill,
      .fill2,
      .stare-bg {
        transition: all 700ms ease;
      }
      &:before {
        background-color: var(--progressbar-color);
        height: 100%;
        content: "";
        display: block;
        position: absolute;
        width: 100%;
      }
      .fill {
        background-color: var(--blue);
        height: 100%;
        position: absolute;
        width: 100%;
      }
      .fill2 {
        transition-delay: 0ms;
        background-color: var(--white);
        height: 100%;
        position: absolute;
        width: 100%;
        transform: scaleY(0.7) scaleX(0);
      }
      .stare-bg {
        background-color: var(--blue);
        height: 100%;
        position: absolute;
        width: 100%;
        opacity: var(--fill);
      }
      .stare-fill {
        background-color: var(--white);
        height: 100%;
        position: absolute;
        width: 100%;
        transform: scaleY(0.4) scaleX(var(--fill));
        transition: all 300ms ease;
      }
    }
  }
</style>
