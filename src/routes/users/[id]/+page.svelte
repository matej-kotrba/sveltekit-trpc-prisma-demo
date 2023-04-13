<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<h2>User: {data.user.name}</h2>

<h3>Update name of user:</h3>

<form use:enhance action="?/updateUser" method="POST">
  <input type="hidden" name="id" value={data.user.id} />
  <input type="text" name="name" value={data.user.name} />
  <button type="submit">Submit</button>
</form>
