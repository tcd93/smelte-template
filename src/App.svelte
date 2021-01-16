<script>
  import {
    Button,
    Dialog
  } from "smelte";

  export let name;

  let showDialog = false;
</script>

<Dialog bind:value={showDialog}>
  <p>Visit the <a class="underline" href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
  <div slot="actions">
    <Button text on:click={() => showDialog = false}>OK</Button>
  </div>
</Dialog>

<main>
  <h1>Hello {name}!</h1>
  <div class="py-2">
    <Button light outlined on:click={() => showDialog = true}>SMELTE IT!</Button>
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>