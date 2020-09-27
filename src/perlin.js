// Based on http://eastfarthing.com/blog/2015-04-21-noise/

let SIZE = 256;
let MASK = SIZE - 1;

let perm = []; // SIZE
let grads_x = []; // SIZE
let grads_y = []; // SIZE

function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

function f(t) {
  t = Math.abs(t);
  return t >= 1.0 ? 0.0 : 1.0 - (3.0 - 2.0 * t) * t * t;
}

function surflet(x, y, grad_x, grad_y) {
  return f(x) * f(y) * (grad_x * x + grad_y * y);
}

function noise(x, y) {
  let result = 0.0;
  let cell_x = Math.floor(x);
  let cell_y = Math.floor(y);
  for (let grid_y = cell_y; grid_y <= cell_y + 1; ++grid_y) {
    for (let grid_x = cell_x; grid_x <= cell_x + 1; ++grid_x) {
      let hash = perm[(perm[grid_x & MASK] + grid_y) & MASK];
      result += surflet(x - grid_x, y - grid_y, grads_x[hash], grads_y[hash]);
    }
  }
  return result;
}

function init() {
  for (let index = 0; index < SIZE; ++index) {
    let other = rand(index);
    if (index > other) {
      perm[index] = perm[other];
    }
    perm[other] = index;
    grads_x[index] = Math.cos((2.0 * Math.PI * index) / SIZE);
    grads_y[index] = Math.sin((2.0 * Math.PI * index) / SIZE);
  }
}

init();

export default noise;
