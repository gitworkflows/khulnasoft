<!-- https://www.khulnasoft.com/c/docs/integrate-section-building -->
<!-- https://www.khulnasoft.com/c/blueprints/announcement-bar -->
<!-- src/routes/announcements/[...catchall]/+page.svelte -->

<script>
  import { isPreviewing, Content } from '@khulnasoft.com/sdk-svelte';

  const apiKey = 'ee9f13b4981e489a9a1209887695ef2b';
  const model = 'announcement-bar';

  export let data;

  const canShowContent = data.content || isPreviewing();
</script>

<main>
  {#if canShowContent}
    <!-- Your Announcement Bar section -->
    <Content {model} content={data.content} {apiKey} />
  {/if}
  <!-- <NavBar/> -->
  <!-- <OtherRestOfYourPage/> -->
  <div>The rest of your page goes here</div>
</main>
