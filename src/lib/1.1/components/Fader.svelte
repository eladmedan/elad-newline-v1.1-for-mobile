<script>
  import { onMount } from "svelte";
  import { expoIn, expoOut, quadIn, quadOut } from "svelte/easing";
  import { fade } from "svelte/transition";

  import { fadeDuration, fadeTranslation } from "../helpers/i18n";

  let show = false;
</script>

{#key $fadeTranslation}
  {#if $fadeTranslation}
    <div
      class="fading"
      on:introend={() => ($fadeTranslation = false)}
      in:fade={{ duration: fadeDuration, easing: quadOut }}
      out:fade={{ duration: fadeDuration, easing: quadIn }}
    />
  {/if}
{/key}

<style>
  .fading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 999999998;
    background-color: white;
    pointer-events: none;
  }
</style>
