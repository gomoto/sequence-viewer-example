class Scroller {

  x: number;
  y: number;
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;

  constructor(x = 0, y = 0, xMax = 0, yMax = 0) {
    this.x = x;
    this.y = y;
    this.xMin = 0;
    this.yMin = 0;
    this.xMax = xMax;
    this.yMax = yMax;
  }

  scrollTo(x: number, y: number) {
    // Limit scroll
		this.x = Math.max(Math.min(this.xMax, x), this.xMin);
		this.y = Math.max(Math.min(this.yMax, y), this.yMin);
  }

  scrollBy(dx: number, dy: number) {
    this.scrollTo(this.x + dx, this.y + dy);
  }

}

export default Scroller;
