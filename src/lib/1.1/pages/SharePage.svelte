<script>
  import { t } from "../helpers/i18n";
  import PageContainer from "./PageContainer.svelte";
  import IconEmail from "../icons/IconEmail.svelte";
  import Li from "../components/Li.svelte";
  import IconLinkedIn from "../icons/IconLinkedIn.svelte";
  import IconFacebook from "../icons/IconFacebook.svelte";
  import IconTwitter from "../icons/IconTwitter.svelte";
  import IconLink from "../icons/IconLink.svelte";
  import CopyClipBoard from "../modules/CopyClipBoard.svelte";

  let copied = false;
</script>

<PageContainer title={$t("share.title")} icon="eye">
  <div class="center">
    <h2>{$t("share.head")}</h2>
    <p class="text-ratz">{$t("share.text")}</p>
  </div>
  <main>
    <ul>
      <Li
        title=""
        go={() => {
          window.open($t("share.link.email"));
        }}
      >
        <IconEmail />
      </Li>
      <Li
        title=""
        go={() => {
          window.open($t("share.link.linkedin"));
        }}
      >
        <IconLinkedIn />
      </Li>
      <Li
        title=""
        go={() => {
          window.open($t("share.link.facebook"));
        }}
      >
        <IconFacebook />
      </Li>
      <Li
        title=""
        go={() => {
          window.open($t("share.link.twitter"));
        }}
      >
        <IconTwitter />
      </Li>
      <Li
        title=""
        go={() => {
          const app = new CopyClipBoard({
            target: document.getElementById("clipboard"),
            props: { name: $t("share.link.copy") },
          });
          app.$destroy();
          copied = true;
          setTimeout(() => {
            copied = false;
          }, 3000);
        }}
      >
        <div id="clipboard" />
        {#if copied}
          {$t("share.copied")}
        {:else}
          <IconLink />
        {/if}
      </Li>
    </ul>
  </main>
</PageContainer>

<style lang="scss">
  .center {
    text-align: center;
    margin: 15vh;
    h2 {
      color: inherit;
      margin: 0;
      font-size: 1.8em;

      font-variation-settings: "wght" 700, "wdth" 100;

      font-family: var(--narkiss-block);
      font-style: normal;
      font-size: 2em;
      text-align: center;
      margin: 0 auto;
      text-transform: lowercase;
      font-feature-settings: "smcp";
      line-height: 1.5;

      color: #0000ff;
    }
    p {
      font-size: 1.5em;
      margin: 0;
      line-height: 1;
    }
  }
  ul {
    display: flex;
    margin: 0 auto;
    max-width: calc(100% - 8em);
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    :global {
      li {
        padding-bottom: 5em !important;
      }
    }
  }
  main {
    font-size: 1.3em;
    line-height: 1.5em !important;
  }
</style>
