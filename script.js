var canvas, ctx, minSize, indexPropMult;

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
  indexPropMult = Math.random()*5;
  for (i in props) {
    console.log(props[i]);
    let stat = Math.floor(Math.random()*4);
    switch(stat) {
      case 0:
        // constant
        consts[props[i]] = Math.random()*100;
        break;
      case 1:
        // other prop of self
        base[props[i]] = "P" + props[Math.floor(Math.random()*props.length)];
        vals[props[i]] = [];
        break;
      case 2:
        base[props[i]] = "S";
        vals[props[i]] = [];
        // sin waveprops
        break;
      default:
        base[props[i]] = "linear";
        vals[props[i]] = [];
        // linear increase, maybe alternate increase/decrease
    }
    for (i = 0; i < Math.random() * minSize ** 2 / 10000; i++) {

    }
  }
}

function run() {
  for (i in base) {
    if (typeof base[props[i]] == "number") {

    }
  }
  for (i in vals) {
    if (i > 100) {

    }
  }
}
