<script>
  import Uniform from "./Uniform.svelte";
  import Perlin from "./Perlin.svelte";
  import Civ1 from "./Civ1.svelte";
  import DiamondSquare from "./DiamondSquare.svelte";
  import Emoji from "./Emoji.svelte";
  import Value from "./Value.svelte";

  let menu = [
    {value: "uniform", nav: "Uniform", header: "Uniform Noise", component: Uniform},
    {value: "emoji", nav: "Emoji", header: "Emoji Map Symbols", component: Emoji},
    {value: "diamond", nav: "Diamond Square", header: "Diamond Square", component: DiamondSquare},
    {value: "perlin", nav: "Perlin Island", header: "Perlin Noise Island", component: Perlin},
    {value: "value", nav: "Value", header: "Value Noise", component: Value},
    {value: "civ1", nav: "Civ1", header: "Civ1 Style Map", component: Civ1},
  ]
  let generator = "civ1"

  $: selected = menu.find(m => m.value === generator)
</script>

<style>
  navbar {
    display: flex;
  }
  navbar label {
    display: block;
    background-color: #bbb;
    padding: 0em 1em;
  }
  navbar label.selected {
    font-weight: bold;
    background-color: #999;
  }
  navbar input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  header {
    font-size: 400%;
    text-align: center;
  }
</style>

<navbar>
  {#each menu as {value,nav}}
    <label class:selected={generator===value}><input type="radio" bind:group={generator} value={value}>{nav}</label>
  {/each}
</navbar>

{#if selected}
  <header>{selected.header}</header>
  <svelte:component this={selected.component}/>
{:else}
  <p>No generator selected.</p>
{/if}
