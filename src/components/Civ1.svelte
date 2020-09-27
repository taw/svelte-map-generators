<script>
  import {xsize, ysize, generate} from "../generators/civ1.js";

  let colors = {
    ocean: "blue",
    mountain: "red",
    hills: "orange",
    desert: "yellow",
    plains: "#ac2",
    grassland: "lime",
    tundra: "#ccc",
    arctic: "white",
    swamp: "purple",
    forest: "#282",
  }

  let map = generate();
</script>

<style>
  .map {
    background-color: #ccc;
    height: 750px;
    width: 1200px;
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
      <rect
        x={15 * x}
        y={15 * y}
        height="15"
        width="15"
        style={`fill:${colors[map[y][x]]}`} />
    {/each}
  {/each}
</svg>
