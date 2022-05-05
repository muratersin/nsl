import { ShapeFactory, Shape } from './shape';

function main() {
  const shapeFactory = new ShapeFactory()

  const circle: Shape =  shapeFactory.getShape('circle')
  circle.draw()

  const recrangle: Shape = shapeFactory.getShape('rectangle')
  recrangle.draw();

  const square: Shape = shapeFactory.getShape('square')
  square.draw();
}

main();

// Output:
// Inside Circle::draw() method.
// Inside Rectangle::draw() method.
// Inside Square::draw() method.