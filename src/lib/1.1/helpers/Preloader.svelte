<script>
  import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";
</script>

<div class="hidden-preload">
  <LottiePlayer
    src="/lottiefiles/visibilityV2.json"
    renderer="svg"
    background="transparent"
  />
</div>

<style>
  .hidden-preload {
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    width: 1px;
    height: 1px;
    z-index: 9999;
    top: -10px;
    left: -10px;
  }
</style>
