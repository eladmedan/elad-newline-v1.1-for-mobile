<script>
  import { mouse } from "../../../positionStore";
  import { shouldHideCursor } from "./AutohideCursor";

  let cursorInactiveSeconds = 0;

  let interval;

  $: {
    clearTimeout(interval);
    interval = setTimeout(() => {
      cursorInactiveSeconds += 1;
    }, 1000);
  }

  $: {
    $shouldHideCursor = cursorInactiveSeconds >= 3;
  }

  $: {
    $mouse;
    cursorInactiveSeconds = 0;
  }
</script>

<!-- <h1>{cursorInactiveSeconds} | {$shouldHideCursor}</h1> -->
