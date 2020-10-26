let xsize = 65;
let ysize = 65;
let points = [];

// min size is 2x2 or it will crash
function generateLayer(xsize, ysize, max) {
  let data = [];
  for(let i=0; i<xsize*ysize; i++) {
    data.push(Math.random() * max);
  }
  return {data, xsize, ysize};
}

function evaluateLayer(layer, x, y) {
  let {data, xsize, ysize} = layer;
  x *= (xsize-1);
  y *= (ysize-1);
  let xi = Math.floor(x);
  let yi = Math.floor(y);
  if (xi == xsize-1) xi--;
  if (yi == ysize-1) yi--;
  let xr = x - xi;
  let yr = y - yi;
  let tl = data[yi * xsize + xi];
  let tr = data[yi * xsize + xi + 1];
  let bl = data[(yi + 1) * xsize + xi];
  let br = data[(yi + 1) * xsize + xi + 1];
  return (
    (1-xr) * (1-yr) * tl +
    (xr) * (1-yr) * tr +
    (1-xr) * (yr) * bl +
    (xr) * (yr) * br
  )
}

function generateMap(...params) {
  return params.map(z => generateLayer(...z))
}

// x and y are 0 to 1
function evaluateMap(map, x, y) {
  let result = 0;
  map.forEach(layer => {
    result += evaluateLayer(layer, x, y)
  })
  return result;
}

export { generateMap, evaluateMap };
