<script>
  import noise from "./perlin";

  let xsize = 40;
  let ysize = 40;
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
          0.125 * noise((x + jx)/32, (y + jy)/32);
      let z = 1 + 0.5 + 0.25 + 0.125;
      n = clamp01(((n / z) + 1) / 2);
      let c;
      if (n < 0.48) {
        c = 'blue;'
      } else if (n < 0.55) {
        c = 'green';
      } else if (n < 0.60) {
        c = 'yellow';
      } else if (n < 0.65) {
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
      <rect x={20*x} y={20*y} height=20 width=20 style={`fill:${c}`} />
    {/each}
  </svg>
