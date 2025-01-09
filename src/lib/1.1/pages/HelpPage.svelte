<script>
  import { t } from "../helpers/i18n";
  import PageContainer from "./PageContainer.svelte";
  import { marked } from "marked";
</script>

<PageContainer title={$t("help.title")} icon="cursor">
  <slot prop="header">
    <div class="extra-header" />
  </slot>

  <main class="text-ratz">
    <section>
      <h2 class="text-ratz">
        {$t("help.head.1")}
      </h2>
      <div class="content">{@html marked.parse($t("help.text.1"))}</div>
    </section>

    <section>
      <h2 class="text-ratz">
        {$t("help.head.2")}
      </h2>
      <div class="content">{@html marked.parse($t("help.text.2"))}</div>
    </section>
  </main>
  <a target="_blank" href={$t("help.button.link")} class="still">
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_445_4378)">
        <path
          d="M5.89018 24.4159C6.09777 24.6243 6.25685 24.8759 6.35606 25.1528C6.45528 25.4297 6.49219 25.7251 6.46418 26.0179C6.32362 27.3731 6.05713 28.7122 5.66818 30.0179C8.45818 29.3719 10.1622 28.6239 10.9362 28.2319C11.3752 28.0096 11.8808 27.9569 12.3562 28.0839C13.719 28.4473 15.1237 28.6302 16.5342 28.6279C24.5262 28.6279 30.5342 23.0139 30.5342 16.6279C30.5342 10.2439 24.5262 4.62793 16.5342 4.62793C8.54218 4.62793 2.53418 10.2439 2.53418 16.6279C2.53418 19.5639 3.76818 22.2879 5.89018 24.4159ZM4.90418 32.2259C4.43032 32.3199 3.95492 32.4059 3.47818 32.4839C3.07818 32.5479 2.77418 32.1319 2.93218 31.7599C3.10976 31.3411 3.27253 30.9162 3.42018 30.4859L3.42618 30.4659C3.92218 29.0259 4.32618 27.3699 4.47418 25.8279C2.02018 23.3679 0.53418 20.1479 0.53418 16.6279C0.53418 8.89593 7.69818 2.62793 16.5342 2.62793C25.3702 2.62793 32.5342 8.89593 32.5342 16.6279C32.5342 24.3599 25.3702 30.6279 16.5342 30.6279C14.9495 30.6301 13.3714 30.4243 11.8402 30.0159C10.8002 30.5419 8.56218 31.4999 4.90418 32.2259Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_445_4378">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.53418 0.62793)"
          />
        </clipPath>
      </defs>
    </svg>
    <span>
      {$t("help.button.text")}
    </span>
  </a>
</PageContainer>

<style lang="scss">
  .still {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 2em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    text-decoration: none;
    border: var(--blue) 2px solid;
    border-radius: 0.5em;
    padding: 0.25em 0.6em;
    transition: 200ms ease all;
    &:hover {
      color: white;
      background-color: var(--blue);
    }
  }
  .extra-header {
    text-align: center;


    nav {
      margin: 1.5em 0 2em;
      font-size: 1.2em;
      a {
        text-decoration: underline;
        color: var(--blue);
      }
    }
  }
  h2 {
    color: inherit;
    margin: 0;
    font-size: 1.8em;
    text-align: center;
  }
  main {
    margin: 0 auto;
    max-width: 40rem;
    .content {
      font-size: 1.3em;
      line-height: 1.5em !important;
    }
  }
  section:not(:last-child) {
    margin-bottom: 4em;
  }
</style>
