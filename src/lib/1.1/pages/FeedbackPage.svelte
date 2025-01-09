<script>
  import { t } from "../helpers/i18n";
  import PageContainer from "./PageContainer.svelte";
  import { marked } from "marked";
  import IconEmail from "../icons/IconEmail.svelte";
  import Li from "../components/Li.svelte";
  import IconWhatsapp from "../icons/IconWhatsapp.svelte";
  import IconLinkedIn from "../icons/IconLinkedIn.svelte";
</script>

<PageContainer title={$t("feedback.title")} icon="eye">
  <div class="center">
    <h2>{$t("feedback.head")}</h2>
    <p class="text-ratz">{$t("feedback.text")}</p>
  </div>
  <main>
    <ul>
      <Li
        title=""
        go={() => {
          window.open($t('feedback.link.email'));
        }}
      >
        <IconEmail />
      </Li>
      <Li
        title=""
        go={() => {
          window.open($t('feedback.link.whatsapp'));
        }}
      >
        <IconWhatsapp />
      </Li>
      <Li
        title=""
        go={() => {
          window.open($t('feedback.link.linkedin'));
        }}
      >
        <IconLinkedIn />
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
