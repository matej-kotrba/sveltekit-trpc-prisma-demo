<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";

  let greeting = "press the button to load data";
  let loading = false;
  let inputText = "";

  const loadData = async () => {
    loading = true;
    greeting = await trpc($page).greeting.query({
      text: inputText,
    });
    loading = false;
  };
</script>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<input type="text" bind:value={inputText} />

<button class="secondary" aria-busy={loading} on:click|preventDefault={loadData}
  >Get data from tRPC</button
>
<p>{greeting}</p>

<style>
  :global(body) {
    font-size: 1.5rem;
  }
</style>
