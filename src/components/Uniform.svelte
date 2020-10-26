<script>
  let xsize = 40;
  let ysize = 40;
  let points = [];

  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      let c = Math.random() > 0.5 ? "lime" : "blue";
      points.push({ x, y, c });
    }
  }
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
  {#each points as { x, y, c }}
    <rect x={20 * x} y={20 * y} height="20" width="20" style={`fill:${c}`} />
  {/each}
</svg>
