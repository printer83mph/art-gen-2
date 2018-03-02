var canvas, ctx, minSize, indexPropMult, frameCount;

const props = ["angle", "length", "sides", "weight", "hue"];
// what each prop is based on
var vals = {}; // each list in this is one property
var consts = {}; // constants
var base = {}; // bases for each prop

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  minSize = Math.min(canvas.width,canvas.height);
  // window setup
  setup();
  run();
}

function setup() {
  frameCount = 0;
  indexPropMult = Math.random()*5;
  for (i in props) {
    let stat = Math.floor(Math.random()*4);
    switch(stat) {
      case 0:
        // constant
        consts[props[i]] = Math.random()*100;
        break;
      case 1:
        // other prop of self
        while (true) {
          base[props[i]] = [props[Math.floor(Math.random()*props.length)], Math.random()*10];
          vals[props[i]] = [];
          if (base[props[i]][0] in base) {
            if (!(base[base[props[i]][0]][0] === props[i])) { break; }
          } else { break; }
        }
        break;
      case 2:
        base[props[i]] = ["S", Math.random()*50, Math.random()*50];
        vals[props[i]] = [];
        // sin waveprops
        break;
      default:
        base[props[i]] = Math.random()*10;
        vals[props[i]] = [];
        // linear increase, maybe alternate increase/decrease
    }
  }
  for (i = 0; i < Math.random() * minSize ** 2 / 10000; i++) {
    for (j in base) {
      vals[j].push(newValFromBase(j,vals[j].length));
    }
  }
}

function newValFromBase(prop,index) {
  if (typeof base[prop] === "number") {
    // return old val plus base[prop]
    return indexPropMult * index;
  } if (base[prop][0] === "S") {
    return Math.sin(frameCount/100)*base[prop][1]+base[prop][2]+indexPropMult*index;
    // return sin of framecount times multiplier plus constant
  }
  // based on other prop
  return getValFromBase(base[prop][0],index) + base[prop][1] + indexPropMult*index;
}

function getValFromBase(prop,index) {
  if (prop in consts) {
    return consts[prop];
  } if (prop in base) {
    if (typeof base[prop] === "number") {
      // return old val plus base[prop]
      return vals[prop][index] + base[prop];
    } if (base[prop][0] === "S") {
      return Math.sin(frameCount/100)*base[prop][1]+base[prop][2]+indexPropMult*index;
      // return sin of framecount times multiplier plus constant
    }
    // based on other prop
    return getValFromBase(base[prop][0],index) + base[prop][1] + indexPropMult*index;
  }
}

function run() {
  for (i in vals) {
    for (j in vals[i]) {
      vals[i][j] = getValFromBase(i,j);
      vals[i][j] = vals[i][j] % 100;
    }
  }
  frameCount++;
  window.requestAnimationFrame(run);
}
