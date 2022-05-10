// Create bridge implementer interface
interface DrawAPI {
  drawCircle(radius: number, x: number, y: number): void;
}

// Create concrete bridge implementer classes imğlementing the DrawAPI interface
class RedCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
      console.log("Drawing Circle[ color: red, radius: " + radius + ", x: " + x + ", " + y + "]")
  }
}

class GreenCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
      console.log("Drawing Green[ color: blue, radius: " + radius + ", x: " + x + ", " + y + "]")
  }
}

// Create an abstract class Shape using the DrawAPI interface
abstract class Shape {
  protected drawApi: DrawAPI;

  protected constructor(drawApi: DrawAPI) {
    this.drawApi = drawApi
  }

  public abstract drawS(): void
}

// Create concrete class implementing the Shape interface
class Circle extends Shape {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number, drawApi: DrawAPI) {
    super(drawApi)
    this.x = x;
    this.y = y;
    this.radius = radius
  }

  public drawS(): void {
    this.drawApi.drawCircle(this.radius, this.x, this.y);
  }
}

function bridgePatternDemo() {
  const redCircle = new Circle(100, 100, 10, new RedCircle())
  const greenCircle = new Circle(100, 100, 10, new GreenCircle())

  redCircle.drawS()
  greenCircle.drawS()
}



