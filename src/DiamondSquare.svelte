<script>
  let xsize = 33;
  let ysize = 33;
  let heightmap = [];
  let map = [];

  function clamp01(t) {
    if (t<0) return 0;
    if (t>1) return 1;
    return t;
  }

  function adjust(x,y,lvl) {
    heightmap[y][x] += (Math.random() - 0.5) * 2 * lvl;
  }

  function get(x,y) {
    // js % is stupid
    y = ((y%ysize)+ysize)%ysize;
    x = ((x%xsize)+xsize)%xsize;
    return heightmap[y][x];
  }

  function set(x,y,v) {
    heightmap[y][x] = v;
  }

  function set_average(x,y,a,b,c,d) {
    set(x,y,(a+b+c+d)/4);
  }

  function create_empty_heightmap() {
    for (let y = 0; y < ysize; y++) {
      heightmap[y] = Array(xsize).fill(0);
    }
  }

  function corners(lvl) {
    adjust(0, 0, lvl);
    adjust(0, xsize-1, lvl);
    adjust(ysize-1, 0, lvl);
    adjust(ysize-1, xsize-1, lvl);
  }

  function square(xc, yc, xs, ys, lvl) {
    if (xs === 0) {
      return;
    }
    set_average(
      xc, yc,
      get(xc+xs, yc+ys),
      get(xc-xs, yc+ys),
      get(xc+xs, yc-ys),
      get(xc-xs, yc-ys),
    ) / 4
    adjust(xc, yc, lvl);
  }

  function diamond(x0, y0, x1, y1, lvl) {
    let xs = Math.abs(x1-x0) / 2;
    let ys = Math.abs(y1-y0) / 2;
    if (xs < 1) {
      return;
    }
    let xm = (x0 + x1) / 2;
    let ym = (y0 + y1) / 2;
    set_average(
      xm, ym,
      get(x0, y0),
      get(x1, y0),
      get(x0, y1),
      get(x1, y1),
    ) / 4
    adjust(xm, ym, lvl);
    square(x0, ym, xs, ys, lvl * 0.75);
    square(x1, ym, xs, ys, lvl * 0.75);
    square(xm, y0, xs, ys, lvl * 0.75);
    square(xm, y1, xs, ys, lvl * 0.75);
    diamond(x0, y0, xm, ym, lvl * 0.5);
    diamond(xm, y0, x1, ym, lvl * 0.5);
    diamond(x0, ym, xm, y1, lvl * 0.5);
    diamond(xm, ym, x1, y1, lvl * 0.5);
  }

  create_empty_heightmap();
  corners(1);
  diamond(0, 0, xsize-1, ysize-1, 1);

  for (let y = 0; y < ysize; y++) {
    map[y] = [];
    for (let x = 0; x < xsize; x++) {
      let h = heightmap[y][x];
      let t = clamp01((h+1) / 2);
      let c;
      if (t > 0.60) {
        c = 'red';
      } else if (t > 0.53) {
        c = 'orange'
      } else if (t < 0.49) {
        c = 'blue'
      } else {
        c = 'lime';
      }
      // let c = Math.round(255 * t);
      // map[y][x] = `rgb(${c},${c},${c})`;
      map[y][x] = c;
    }
  }
  console.log(heightmap)
</script>

<style>
  header {
    font-size: 400%;
    text-align: center;
  }
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

<header>Diamond Square</header>

<svg class="map">
  {#each Array(ysize) as _, y}
    {#each Array(xsize) as _, x}
      <rect x={20*x} y={20*y} height=20 width=20 style={`fill:${map[y][x]}`} />
    {/each}
  {/each}
</svg>
