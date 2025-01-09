<script>
  import { styleSidesStyleNumber } from "../../../../keyboardStore";
</script>

<div
  class:styleSidesStyleNumber-0={$styleSidesStyleNumber === 0}
  class:styleSidesStyleNumber-1={$styleSidesStyleNumber === 1}
>
  <slot />
</div>

<style>
  .styleSidesStyleNumber-0 {
    -webkit-mask-image: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0) 21.8%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1) 70%,
      rgba(0, 0, 0, 0) 78.2%
    );
  }
  .styleSidesStyleNumber-1 {
    -webkit-mask-image: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.15) 20%,
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1) 70%,
      rgba(0, 0, 0, 0.15) 80%,
      rgba(0, 0, 0, 0.05)
    );
  }
</style>
