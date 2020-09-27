<script>
  import noise from "./perlin";

  let xsize = 80;
  let ysize = 80;
  let points = [];

  let jx = Math.random();
  let jy = Math.random();

  function clamp01(t) {
    if (t<0) return 0;
    if (t>1) return 1;
    return t;
  }

  for(let x=0; x<xsize; x++) {
    for(let y=0; y<ysize; y++) {
      // arbitrary jitter and scale
      let n =    noise((x + jx)/4, (y + jy)/4) +
          0.5 *  noise((x + jx)/8, (y + jy)/8) +
          0.25 * noise((x + jx)/16, (y + jy)/16) +
          0.125 * noise((x + jx)/32, (y + jy)/32) +
          0.125 * noise((x + jx)/64, (y + jy)/64);
      let z = 1 + 0.5 + 0.25 + 0.125 + 0.125;
      // go way down on edges
      let cx = Math.abs(2*x/(xsize-1) - 1)
      let cy = Math.abs(2*y/(ysize-1) - 1)
      n -= Math.pow(cx, 5) + Math.pow(cy, 5)

      n = clamp01(((n / z) + 1) / 2);
      let c;
      if (n < 0.45) {
        c = 'blue;'
      } else if (n < 0.50) {
        c = 'green';
      } else if (n < 0.55) {
        c = 'yellow';
      } else if (n < 0.60) {
        c = 'orange';
      } else {
        c = 'red';
      }
      // let q = Math.round(n * 255);
      // c = `rgb(${q},${q},${q})`;
      points.push({x,y,c});
    }
  }
  </script>

  <style>
  header {
    font-size: 400%;
    text-align: center;
  }
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

  <header>Perlin Noise</header>

  <svg class="map">
    {#each points as {x,y,c}}
      <rect x={10*x} y={10*y} height=10 width=10 style={`fill:${c}`} />
    {/each}
  </svg>
