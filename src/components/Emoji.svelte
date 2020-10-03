<script>
  let xsize = 40;
  let ysize = 40;
  let points = [];

  let terrain = {
    "mountain": {color: "orange", icon: "⛰️"},
    "snow-mountain": {color: "white", icon: "🏔️"},
    "volcano": {color: "red", icon: "🌋"},
    "desert": {color: "yellow", icon: "🏜️"},
    "desert-island": {color: "yellow", icon: "🏝️"},
    "water": {color: "blue", icon: "🌊"},
    "beach": {color: "yellow", icon: "🏖️"},
    "cold-forest": {color: "green", icon: "🌲"},
    "forest": {color: "green", icon: "🌳"},
    "palm-forest": {color: "green", icon: "🌴"},
  }

  function random_terrain() {
    let options = Object.keys(terrain);
    return options[Math.floor(Math.random() * options.length)]
  }

  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      let t = random_terrain();
      points.push({ x, y, t });
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
  {#each points as { x, y, t }}
    <rect x={20 * x} y={20 * y} height="20" width="20" style={`fill:${terrain[t].color}`} />
    <text x={20 * x + 10} y={20 * y + 10} text-anchor="middle" dominant-baseline="central">{terrain[t].icon}</text>
  {/each}
</svg>
