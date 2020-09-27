<script>
  import {generate} from "../generators/perlin.js";
  let points = generate();
</script>

<style>
.map {
  background-color: #ccc;
  height: 800px;
  width: 800px;
  margin: auto;
  display: block;
}
rect {
  stroke-width: 1px;
  stroke: black;
}
</style>

<svg class="map">
  {#each points as {x,y,c,h}}
    <rect x={10*x} y={10*y} height=10 width=10 style={`fill:${c}`} data-h={h} />
  {/each}
</svg>
