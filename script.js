var canvas, ctx, minSize, indexPropMult;

const props = ("angle", "length", "sides", "weight", "hue")
// what each prop is based on
var changeables = {};
var vals = {};

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  minSize = min(canvas.width,canvas.height);
  // window setup
  setup();
  run();
}

function setup() {
  if (Math.random() < 0.5) {
    for (i in props) {
      vals[i] = [];
      let stat = Math.floor(Math.random()*4);
      switch(stat) {
        case 0:
          // constant
          break;
        case 1:
          // other prop
          break;
        case 2:
          // sin wave
          break;
        default:
          // linear increase, maybe alternate increase/decrease
      }
    }
    for (i = 0; i < Math.random() * minSize ** 2 / 10000; i++) {

    }
  }
}

function run() {

}
