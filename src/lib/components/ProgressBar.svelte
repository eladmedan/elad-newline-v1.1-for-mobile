<script>
  import { currentChapterPercentage } from "../../tempStore";
</script>

<div class="line">
  <div class="fill" style="width: {$currentChapterPercentage}%" />
  <!-- <div class="circle" style="right: {$currentChapterPercentage}%" /> -->
</div>

<style lang="scss">
  .line {
    transition: opacity 200ms ease;
    transition-delay: 500ms;

    position: absolute;
    height: 0.2em;
    bottom: 0.4vh;
    width: calc(100% - 0.4vh - 0.4vh);
    margin: 0px 0.4vh;
    box-sizing: border-box;
    &:before {
      transition: transform 700ms ease;
      background-color: black;
      height: 100%;
      content: "";
      display: block;
      position: absolute;
      width: 100%;
    }
    .fill {
      transition: transform 700ms ease;
      background-color: var(--blue);
      height: 100%;
      position: absolute;
      width: 100%;
      /* will-change: width, transform; */
    }
    .circle {
      position: absolute;
      font-size: 1.9em;
      height: 1em;
      width: 1em;
      background-color: var(--blue);
      top: -0.4em;
      margin-inline-start: -0.3em;
      border: 0.11em solid white;
      box-sizing: border-box;
      border-radius: 100%;
    }
    &.filled {
      &:before {
        background-color: var(--blue);
      }
    }
  }
  :global {
    .isHoverBottomNav {
      > .line {
        opacity: 0;
        transition-delay: 0ms !important;
      }
    }
  }
</style>
