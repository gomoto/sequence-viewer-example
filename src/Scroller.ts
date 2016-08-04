// TOOD: opt into number rounding.
class Scroller {

  xMin: number;
  yMin: number;

  xMax: number;
  yMax: number;

  _x: number;
  _y: number;

  get x() {
    return this._x;
  }

  // clamp x between max and min
  set x(x: number) {
    this._x = Math.max(Math.min(this.xMax, x), this.xMin);
  }

  get y() {
    return this._y;
  }

  // clamp y between max and min
  set y(y: number) {
    this._y = Math.max(Math.min(this.yMax, y), this.yMin);
  }

  // linearly transform (x,y) to (r,s) by these ratios
  xRatio: number;
  yRatio: number;

  set ratio(ratio: number[]) {
    [this.xRatio, this.yRatio] = ratio;
  }

  get r() {
    return Math.round(this._x * this.xRatio);
  }

  set r(r: number) {
    this.x = Math.round(r / this.xRatio);
  }

  get s() {
    return Math.round(this._y * this.yRatio);
  }

  set s(s: number) {
    this.y = Math.round(s / this.yRatio);
  }

  constructor(x = 0, y = 0, xMin = 0, yMin = 0, xMax = 0, yMax = 0, xRatio = 1, yRatio = 1) {
    // Set min and max first so that x and y get clamped between them.
    this.xMin = xMin;
    this.yMin = yMin;
    this.xMax = xMax;
    this.yMax = yMax;
    this.x = x;
    this.y = y;
    this.xRatio = xRatio;
    this.yRatio = yRatio;
  }

  scroll(dx: number, dy: number) {
    this.x = this.x + dx;
    this.y = this.y + dy;
  }

}

export default Scroller;
