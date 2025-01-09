<script>
  import { t } from "../helpers/i18n";
  import PageContainer from "./PageContainer.svelte";
  import { marked } from "marked";
</script>

<PageContainer title={$t("about.title")} icon="cursor">
  <slot prop="header">
    <div class="extra-header">
      <h2 class="text-ratz">
        {$t("about.projectname")}
      </h2>

      <nav>
        <a target="_blank" href={$t("about.link1.url")}>{$t("about.link1.text")}</a>
        |
        <a target="_blank" href={$t("about.link2.url")}>{$t("about.link2.text")}</a>
        |
        <a target="_blank" href={$t("about.link3.url")}>{$t("about.link3.text")}</a>
      </nav>
    </div>
  </slot>

  <main class="text-ratz">
    {@html marked.parse($t("about.text"))}
  </main>
</PageContainer>

<style lang="scss">
  .extra-header {
    text-align: center;
    h2 {
      color: inherit;
      margin: 0;
      font-size: 1.8em;
    }
    nav {
      margin: 1.5em 0 2em;
      font-size: 1.2em;
      a {
        text-decoration: underline;
        color: var(--blue);
      }
    }
  }
  main {
    margin: 0 auto;
    max-width: 40rem;
    font-size: 1.3em;
    line-height: 1.5em !important;
  }
</style>
