var canvas, ctx, minSize, indexPropMult, frameCount, vals, consts, base, len;

const props = ["angle", "length", "sides", "weight", "hue", "saturation", "value", "x", "y"];

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  minSize = Math.min(canvas.width,canvas.height);
  // window setup
  setup();
  window.requestAnimationFrame(run);
}

function setup() {
  // what each prop is based on
  vals = {}; // each list in this is one property
  consts = {}; // constants
  base = {}; // bases for each prop
  frameCount = 0;
  indexPropMult = Math.random()*5;
  for (i in props) {
    let stat = Math.floor(Math.random()*4);
    switch(stat) {
      case 0:
        // constant
        vals[props[i]] = [];
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
        base[props[i]] = ["S", Math.random()*25, Math.random()*50];
        vals[props[i]] = [];
        // sin waveprops
        break;
      default:
        base[props[i]] = Math.random()*10;
        vals[props[i]] = [];
        // linear increase, maybe alternate increase/decrease
    }
  }
  // len = Math.random() * minSize ** 2 / 10000;
  len = 1;
  for (i = 0; i < len; i++) {
    for (j in base) {
      vals[j].push(newValFromBase(j,vals[j].length));
    }
    for (j in consts) {
      vals[j].push(consts[j]);
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
      return (Math.sin(frameCount/100) + 1)*base[prop][1]+base[prop][2]+indexPropMult*index;
      // return sin of framecount times multiplier plus constant
    }
    // based on other prop
    return getValFromBase(base[prop][0],index) + base[prop][1] + indexPropMult*index;
  }
}

function run() {
  ctx.fillRect(0,0,innerWidth,innerHeight);
  console.log("vals length is " + vals["x"].length);
  for (i in base) {
    for (j in vals[i]) {
      vals[i][j] = getValFromBase(i,j);
      vals[i][j] = vals[i][j] % 100;
    }
  }
  for (var i = 0; i < len; i++) {
    ctx.beginPath();
    ctx.moveTo(vals["x"][i], vals["y"][i]);
    var lastX = vals["x"][i];
    var lastY = vals["y"][i];
    for (var j = 0; j < vals["sides"][i] / 10; j++) {
      ctx.strokeStyle = "hsl(" + vals["hue"][i]*3.6 + vals["saturation"][i] + vals["value"][i] + ")";
      ctx.lineWidth = vals["weight"]/2;
      var curAngle = vals["angle"][i] / 50 * Math.PI + Math.PI * 20 / j;
      lastX += Math.cos(curAngle)*vals["length"][i];
      lastY += Math.sin(curAngle)*vals["length"][i];
      ctx.lineTo(lastX, lastY);
    }
  }
  frameCount++;
  window.requestAnimationFrame(run);
}
