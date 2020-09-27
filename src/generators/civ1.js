// based on:
// https://forums.civfanatics.com/threads/civ1-map-generation-explained.498630/
// but not a complete reimplementation

import randint from "../util/randint.js";

// awkward globals
let heightmap = [];
let map = [];

let xsize = 80;
let ysize = 50;

function create_empty_heightmap() {
  for (let y = 0; y < ysize; y++) {
    heightmap[y] = Array(xsize).fill(0);
  }
}

function paint_land() {
  let x = randint(3, xsize - 3);
  let y = randint(3, ysize - 3);
  let l = randint(1, 64);
  let result = {};
  while (l > 0) {
    l--;
    if(!result[y]) result[y] = {};
    if(!result[y+1]) result[y+1] = {};
    result[y][x] = 1;
    result[y][x + 1] = 1;
    result[y + 1][x] = 1;
    switch (randint(0, 3)) {
      case 0:
        x++;
        break;
      case 1:
        x--;
        break;
      case 2:
        y++;
        break;
      case 3:
        y--;
    }
    if (x < 3 || y < 3 || x > xsize - 3 || y > ysize - 3) {
      break;
    }
  }
  return result;
}

function add_land() {
  let lands = 0;
  while (lands < xsize * ysize * 0.4) {
    let pushed = paint_land();
    for (let y in pushed) {
      for (let x in pushed[y]) {
        if (heightmap[y][x] === 0) lands++;
        heightmap[y][x]++;
      }
    }
  }
}

function setup_base_map() {
  for (let y = 0; y < ysize; y++) {
    map[y] = [];
    for (let x = 0; x < xsize; x++) {
      let h = heightmap[y][x];
      let t = (Math.abs(y - ysize/2) + randint(0, 7)) / (ysize/2 + 7);

      let c;
      if (h === 0) {
        c = "ocean";
      } else if (h >= 3) {
        c = "mountain";
      } else if (h >= 2) {
        c = "hills";
      } else if (t < 0.25) {
        c = "desert";
      } else if (t < 0.5) {
        c = "plains";
      } else if (t < 0.75) {
        c = "tundra";
      } else {
        c = "arctic";
      }
      map[y][x] = c;
    }
  }
}

function climate_adjustments() {
  for (let y = 0; y < ysize; y++) {
    let lat = Math.abs(y - ysize/2);
    let wetness_yield = Math.abs(lat - ysize/4) + 4;
    let wetness = 0;

    // go east
    for (let x = 0; x < xsize; x++) {
      let t = map[y][x];
      if (t === "ocean") {
        if (wetness_yield > wetness) wetness ++;
        continue;
      }
      let rainfall = randint(0, 5);
      if (t === "mountain") rainfall += 3;
      if (wetness > 0) {
        if (t === "desert") {
          map[y][x] = "plains"
        } else if (t === "tundra") {
          map[y][x] = "arctic";
        } else if (t === "hills") {
          map[y][x] = "forest";
        } else if (t === "plains") {
          map[y][x] = "grassland";
        } else {
          // OK
        }
        wetness -= rainfall;
        if (wetness < 0) wetness = 0;
      }
    }

    // go west
    wetness_yield = Math.abs(lat/2) + 4;
    for (let x = xsize-1; x >= 0; x--) {
      let t = map[y][x];
      if (t === "ocean") {
        if (wetness_yield > wetness) wetness ++;
        continue;
      }
      let rainfall = randint(0, 5);
      if (t === "mountain") rainfall += 3;
      if (wetness > 0) {
        if (t === "desert") {
          map[y][x] = "plains";
        } else if (t === "hills") {
          map[y][x] = "forest";
        } else if (t === "mountain") {
          map[y][x] = "forest";
        } else if (t === "plains") {
          map[y][x] = "grassland";
        } else if (t === "grassland") {
          map[y][x] = "swamp"; // or jungle
        } else {
          // OK
        }
        wetness -= rainfall;
        if (wetness < 0) wetness = 0;
      }
    }
  }
}

function setup_arctic() {
  for (let x=0; x<xsize; x++) {
    map[0][x] = "arctic";
    map[ysize-1][x] = "arctic";
  }
  for(let i=0; i<20; i++) {
    map[0][randint(0, xsize-1)] = "tundra";
    map[1][randint(0, xsize-1)] = "tundra";
    map[ysize-2][randint(0, xsize-1)] = "tundra";
    map[ysize-1][randint(0, xsize-1)] = "tundra";
  }
}

function generate() {
  create_empty_heightmap();
  add_land();
  // fix_straits();
  setup_base_map();
  climate_adjustments();
  // erosion();
  // setup_rivers();
  setup_arctic();
  return map;
}

export {xsize, ysize, generate};
