<script>
  import {xsize, ysize, generate} from "../generators/diamond_square.js";
  let map = generate();
</script>

<style>
  .map {
    background-color: #ccc;
    height: 640px;
    width: 640px;
    margin: auto;
    display: block;
  }
  rect {
    stroke-width: 1px;
    stroke: black;
  }
</style>

<svg class="map">
  {#each Array(ysize) as _, y}
    {#each Array(xsize) as _, x}
      <rect x={20*x} y={20*y} height=20 width=20 style={`fill:${map[y][x]}`} />
    {/each}
  {/each}
</svg>
