<script>
  import Uniform from "./Uniform.svelte";
  import Perlin from "./Perlin.svelte";
  import Civ1 from "./Civ1.svelte";
  import DiamondSquare from "./DiamondSquare.svelte";

  let generator = "uniform"

  let menu = [
    {value: "uniform", nav: "Uniform", header: "Uniform Noise", component: Uniform},
    {value: "diamond", nav: "Diamond Square", header: "Diamond Square", component: DiamondSquare},
    {value: "perlin", nav: "Perlin", header: "Perlin Noise Island", component: Perlin},
    {value: "civ1", nav: "Civ1", header: "Civ1 Style Map", component: Civ1},
  ]
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

{#if generator === "uniform"}
  <header>Uniform Noise</header>
  <Uniform />
{:else if generator === "perlin"}
  <header>Perlin Noise Island</header>
  <Perlin />
{:else if generator === "civ1"}
  <header>Civ1 Style Map</header>
  <Civ1/>
{:else if generator === "diamond"}
  <header>Diamond Square</header>
  <DiamondSquare/>
{:else}
  <p>No generator selected.</p>
{/if}
