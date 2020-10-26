<script>
  import {evaluateMap, generateMap} from "../generators/value.js";
  import clamp01 from "../util/clamp01.js";

  let mapH = generateMap(
    [3, 3, 0.1],
    [9, 9, 0.4],
    [17, 17, 0.3],
    [33, 65, 0.1],
    [65, 65, 0.1],
  );
  let mapT = generateMap(
    [3, 3, 0.1],
    [9, 9, 0.4],
    [17, 17, 0.3],
    [33, 65, 0.1],
    [65, 65, 0.1],
  );
  let mapW = generateMap(
    [3, 3, 0.1],
    [9, 9, 0.4],
    [17, 17, 0.3],
    [33, 65, 0.1],
    [65, 65, 0.1],
  );

  let xsize = 65;
  let ysize = 65;
  let points = [];

  for (let x = 0; x < xsize; x++) {
    for (let y = 0; y < ysize; y++) {
      let h = clamp01(evaluateMap(mapH, x/xsize, y/ysize), 0, 255);
      let t = clamp01(evaluateMap(mapT, x/xsize, y/ysize), 0, 255);
      let w = clamp01(evaluateMap(mapW, x/xsize, y/ysize), 0, 255);
      let c;
      let i;

      if (h < 0.475) {
        c = "blue";
      } else if (h > 0.6) {
        if (t > 0.55) {
          c = "red";
          i = "🌋";
        } else if (t > 0.5) {
          c = "orange";
          i = "⛰️";
        } else {
          c = "white;"
          i = "🏔️";
        }
      } else if (h > 0.575) {
        c = "orange";
        i = "☘️";
      } else if (t < 0.45) {
        c = "white";
        i = "☃";
      } else if (t > 0.55 && w < 0.45) {
        c = "yellow";
        i = "🏜️";
      } else if (t < 0.5) {
        c = "green";
        i = "🌲"
      } else {
        c = "lime";
        i = "🌴";
      }

      points.push({ x, y, h, t, w, c, i });
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
  {#each points as { x, y, c, i }}
    <rect x={20 * x} y={20 * y} height="20" width="20" style={`fill:${c}`} />
    <text x={20 * x + 10} y={20 * y + 10} text-anchor="middle" dominant-baseline="central">{i || ""}</text>
  {/each}
</svg>
