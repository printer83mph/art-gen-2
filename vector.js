class Vector {

  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  static add(v1,v2) {
    return new Vector(v1.x+v2.x, v1.y+v2.y);
  }

  static sub(v1,v2) {
    return new Vector(v1.x-v2.x, v1.y-v2.y);
  }

  static fromDir(dir) {
    return(new Vector(Math.cos(dir), Math.sin(dir)));
  }

  get magnitude() {
    return((this.x**2 + this.y**2)**0.5);
  }

  set magnitude(mag) {
    var dir = this.direction;
    this.x = Math.cos(dir) * mag;
    this.y = Math.sin(dir) * mag;
  }

  get direction() {
    return(Math.atan2(this.y,this.x));
  }

  set direction(dir) {
    var mag = this.magnitude;
    this.x = Math.cos(dir) * mag;
    this.y = Math.sin(dir) * mag;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  mul(input) {
    if(input instanceof Vector) {
      this.x *= input.x;
      this.y += input.y;
    } else {
      this.x *= input;
      this.y *= input;
    }
  }

  dot(vec) {
    return this.x * vec.x + this.y * vec.y;
  }
}
