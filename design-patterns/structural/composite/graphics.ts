// The component interface declares common operations for both
// simple and complex objects of a composition
interface Graphic {
  move(x: number, y: number): void;
  draw(): void;
}

// The leaf class represents end objects of a composition.
// A leaf object can't have a sub-objects. Usually, it's leaf
// objects that do the actual work while composite objects only
// delegate to their sub-components
class Dot implements Graphic {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number): void {
    this.x = this.x + x;
    this.y = this.y + y;
  }

  draw(): void {
      console.log('A Dot drawed')
  }
}

// All component classes can extend other components.
class CircleC extends Dot {
  radius: number;

  constructor(x: number, y: number, radius: number) {
    super(x, y)
    this.radius = radius;
  }

  draw(): void {
      console.log('A circle drawed')
  }
}

// The composite class represents complex components that may
// have children. Composite objects usually delegate the actual
// work to their children and then "sum up" the result.
class CompoundGraphic implements Graphic {
  children: Graphic[];

  add(graphic: Graphic) {
    this.children.push(graphic)
  }

  remove(graphic: Graphic) {
    this.children = this.children.filter(c => c !== graphic);
  }

  move(x: number, y: number): void {
    this.children.forEach((c: Graphic) => {
      c.move(x, y)
    })
  }

  draw(): void {
    this.children.forEach((c: Graphic) => {
      c.draw()
    })
  }
}

// The client code works with all the components via their base
// interface. This way the client code can support simple leaf
// components as well as complex composites.
function graphicAppDemo() {
  const all = new CompoundGraphic();

  all.add(new Dot(1, 2));
  all.add(new CircleC(5, 3, 10));

  all.move(1, 2);
  all.draw();
}