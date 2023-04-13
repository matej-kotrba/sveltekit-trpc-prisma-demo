<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h2>Welcome to Users page</h2>

<ul>
  {#each data.users as user}
    <li><a href="/users/{user.name}">{user.name}</a></li>
  {/each}
</ul>

<form use:enhance action="?/createUser" method="POST">
  <input type="text" name="name" />
  <button type="submit">Submit</button>
</form>
