<script lang="ts">
  import type { PageData } from './$types';
  import { Content, isPreviewing } from '@khulnasoft.com/sdk-svelte';
  export let data: PageData;
  const { article } = data;
  const model = 'blog-article';
  const apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
</script>

{#if !article && !isPreviewing()}
  <div>404</div>
{:else if article?.data}
  <div class="content">
    <h1>{article.data.title}</h1>
    <p>{article.data.blurb}</p>
    <img src={article.data.image} alt={article.data.title} />
    <Content {model} content={article} {apiKey} />
  </div>
{/if}
