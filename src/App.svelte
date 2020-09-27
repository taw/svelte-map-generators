<script>
  import Uniform from "./Uniform.svelte";
  import Perlin from "./Perlin.svelte";
  import Civ1 from "./Civ1.svelte";
  import DiamondSquare from "./DiamondSquare.svelte";

  let generator = "diamond"
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
</style>

<navbar>
  <label class:selected={generator==="uniform"}><input type="radio" bind:group={generator} value="uniform"/>Uniform</label>
  <label class:selected={generator==="perlin"}><input type="radio" bind:group={generator} value="perlin"/>Perlin</label>
  <label class:selected={generator==="civ1"}><input type="radio" bind:group={generator} value="civ1"/>Civ1</label>
  <label class:selected={generator==="diamond"}><input type="radio" bind:group={generator} value="diamond"/>Diamond Square</label>
</navbar>

{#if generator === "uniform"}
  <Uniform />
{:else if generator === "perlin"}
  <Perlin />
{:else if generator === "civ1"}
  <Civ1/>
{:else if generator === "diamond"}
  <DiamondSquare/>
{:else}
  No generator selected.
{/if}
