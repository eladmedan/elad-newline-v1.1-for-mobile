<script lang="ts">
  export let title;
  export let icon: "cursor" | "eye";
</script>

<div>
  <header>
    <header>
      {#if icon === "cursor"}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6455 11.9866L11.7479 11.7474L11.9871 11.6449L17.8923 9.11537L2.09464 2.09404L9.11633 17.8925L11.6455 11.9866ZM9.09376 17.9453L9.09381 17.9451L9.09376 17.9453Z"
            stroke="black"
            stroke-width="1.3"
          />
        </svg>
      {/if}
      {#if icon === "eye"}
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 7C20 7 16.25 0.125 10 0.125C3.75 0.125 0 7 0 7C0 7 3.75 13.875 10 13.875C16.25 13.875 20 7 20 7ZM1.46625 7C2.07064 6.0814 2.7658 5.22586 3.54125 4.44625C5.15 2.835 7.35 1.375 10 1.375C12.65 1.375 14.8488 2.835 16.46 4.44625C17.2354 5.22586 17.9306 6.0814 18.535 7C18.4625 7.10875 18.3825 7.22875 18.2913 7.36C17.8725 7.96 17.2538 8.76 16.46 9.55375C14.8488 11.165 12.6487 12.625 10 12.625C7.35 12.625 5.15125 11.165 3.54 9.55375C2.76456 8.77414 2.0694 7.91859 1.465 7H1.46625Z"
            fill="black"
          />
          <path
            d="M10 3.875C9.1712 3.875 8.37634 4.20424 7.79029 4.79029C7.20424 5.37634 6.875 6.1712 6.875 7C6.875 7.8288 7.20424 8.62366 7.79029 9.20971C8.37634 9.79576 9.1712 10.125 10 10.125C10.8288 10.125 11.6237 9.79576 12.2097 9.20971C12.7958 8.62366 13.125 7.8288 13.125 7C13.125 6.1712 12.7958 5.37634 12.2097 4.79029C11.6237 4.20424 10.8288 3.875 10 3.875ZM5.625 7C5.625 5.83968 6.08594 4.72688 6.90641 3.90641C7.72688 3.08594 8.83968 2.625 10 2.625C11.1603 2.625 12.2731 3.08594 13.0936 3.90641C13.9141 4.72688 14.375 5.83968 14.375 7C14.375 8.16032 13.9141 9.27312 13.0936 10.0936C12.2731 10.9141 11.1603 11.375 10 11.375C8.83968 11.375 7.72688 10.9141 6.90641 10.0936C6.08594 9.27312 5.625 8.16032 5.625 7Z"
            fill="black"
          />
        </svg>
      {/if}

      <h1 class="caps">
        {title}
      </h1>

      <slot name="header" />
    </header>
  </header>
  <slot />
</div>

<style lang="scss">
  div {
    color: var(--black);
    overflow: auto;
    height: calc(100vh - var(--top-nav-height));
    margin-top: var(--top-nav-height);
    padding: 5em;
    box-sizing: border-box;

    font-family: var(--narkiss-block);
    font-size: 1.2em;
    font-variation-settings: "wght" 500, "wdth" 100;

    :global(a) {
      color: var(--blue);
      text-decoration: underline;
      &:hover {
        border: none;
      }
    }

    header {
      text-align: center;
      svg {
      }
      h1 {
        color: inherit;
        margin: 0;
      }
      h1 {
        color: var(--blue);
        margin-bottom: 1em;
        font-size: 1.3em;
      }
    }
    :global(h3) {
      font-variation-settings: "wght" 700, "wdth" 100;
      font-family: var(--narkiss-block);
      font-style: normal;
      color: inherit;
      margin:1.5em 0 -0.3em !important;
      &:first-child {
        margin-top: 1em !important;
      }
      font-size: 1.0em;
      line-height: 1.2;
      margin: 0 auto;
      text-transform: lowercase;
      font-feature-settings: "smcp";
    }
  }
</style>
