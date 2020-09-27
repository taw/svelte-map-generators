import perlin_noise from "../util/perlin_noise.js";

let xsize = 80;
let ysize = 80;

function generate() {
  let points = [];

  let jx = Math.random();
  let jy = Math.random();

  for (let x=0; x<xsize; x++) {
    for (let y=0; y<ysize; y++) {
      // arbitrary jitter and scale
      let n =
          0.1 * perlin_noise((x + jx)/1, (y + jy)/1) +
          0.2 * perlin_noise((x + jx)/2, (y + jy)/2) +
          0.4 * perlin_noise((x + jx)/4, (y + jy)/4) +
          0.2 * perlin_noise((x + jx)/8, (y + jy)/8) +
          0.2 * perlin_noise((x + jx)/16, (y + jy)/16) +
          0.2 * perlin_noise((x + jx)/32, (y + jy)/32) +
          0.2 * perlin_noise((x + jx)/64, (y + jy)/64);
      let z = 0.1 + 0.2 + 0.4 + 0.2 + 0.2 + 0.2 + 0.2
      // go way down on edges
      let cx = Math.abs(2*x/(xsize-1) - 1)
      let cy = Math.abs(2*y/(ysize-1) - 1)
      let h = n/z - 0.4 * Math.max( Math.pow(cx, 8), Math.pow(cy, 8) )
      points.push({x,y,h});
    }
  }

  function ntile(ary, ntile) {
    return ary[Math.floor(ntile * ary.length)];
  }

  let heights_histogram = points.map(({h}) => h).sort((a,b) => a-b);
  let water_level = ntile(heights_histogram, 0.35);
  let hill_level = ntile(heights_histogram, 0.7);
  let mountain_level = ntile(heights_histogram, 0.97);

  console.log([
    mountain_level,
    hill_level,
    water_level
  ])

  for(let pt of points) {
    let c;
    if (pt.h >= mountain_level) {
      c = 'red'
    } else if (pt.h >= hill_level) {
      c = 'orange'
    } else if (pt.h >= water_level) {
      c = 'lime'
    } else {
      c = 'blue'
    }
    pt.c = c;
  }

  return points;
}

export {xsize, ysize, generate};
