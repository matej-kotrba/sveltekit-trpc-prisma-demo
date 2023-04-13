<script lang="ts">
  import { enhance, type SubmitFunction } from "$app/forms";
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import type { User } from "@prisma/client";

  let greeting = "press the button to load data";
  let user: User | null = null;
  let loading = false;
  let inputText = "";
  let createUserData = {};

  // $: console.log($page);

  const loadData = async () => {
    loading = true;
    const response = await trpc($page).greeting.query({
      text: inputText,
    });
    greeting = response.text;
    user = response.user;
    loading = false;
  };

  const onFormSubmit: SubmitFunction = async ({ data, cancel }) => {
    if (!data.get("name")) {
      cancel();
      return;
    }
    console.log(data.get("name")?.toString());
    const createdUser = await trpc($page).addUser.mutate({
      name: data.get("name")?.toString() as string,
    });

    return ({ update }) => {
      createUserData = createdUser;
      update();
    };
  };
</script>

<h6>Loading data in<br /><code>+page.svelte</code></h6>

<input type="text" bind:value={inputText} />

<button class="secondary" aria-busy={loading} on:click|preventDefault={loadData}
  >Get data from API via tRPC</button
>
<p>{greeting}</p>
{#if user}
  <p>user: {user.name}</p>
{/if}

<form use:enhance={onFormSubmit} method="POST">
  <label for="name">Name: </label>
  <input type="text" id="name" name="name" />
  <button>Submit</button>
</form>

<!-- {#if createUserData.name}
  <p>{createUserData.name}</p>
{/if} -->

<style>
  :global(body) {
    font-size: 1.5rem;
    color: white;
    background: black;
  }
</style>
