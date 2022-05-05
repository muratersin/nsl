interface Shape {
  draw: () => void
}

// Create concrete classes implementing the same interface.
class RoundedRectangle implements Shape {
  draw() {
    console.log('Inside RoundedRectangle::draw() method.')
  }
}

class RoundedSquare implements Shape {
  draw() {
    console.log('Inside RoundedSquare::draw() method.')
  }
}

class Rectangle implements Shape {
  draw() {
    console.log('Inside Rectangle::draw() method.')
  }
}

class Square implements Shape {
  draw() {
    console.log('Inside Square::draw() method.')
  }
}

// Create an Abstract class to get factories for Normal and Rounded Shape Objects.
abstract class AbstractShapeFactory {
  abstract getShape(shapeType: string): Shape
}

// Create Factory classes extending AbstractFactory to generate object of concrete class based on given information.
class ShapeFactory extends AbstractShapeFactory {
  getShape(shapeType: string): Shape {
    if (shapeType === 'rectangle') {
      return new Rectangle()
    } else if (shapeType === 'square') {
      return new Square()
    }

    return null
  }
}

class RoundedShapeFactory extends AbstractShapeFactory {
  getShape(shapeType: string): Shape {
    if (shapeType === 'rectangle') {
      return new RoundedRectangle()
    } else if (shapeType === 'square') {
      return new RoundedSquare()
    }

    return null
  }
}

// Create a Factory generator/producer class to get factories by passing an information such as Shape
class ShapeFactoryProducer {
  static getFactory(rounded: boolean): AbstractShapeFactory {
    if (rounded) {
      return new RoundedShapeFactory()
    }

    return new ShapeFactory()
  }
}


function main() {
  const shapeFactory: AbstractShapeFactory = ShapeFactoryProducer.getFactory(false)

  const rectangle: Rectangle = shapeFactory.getShape('rectangle')
  rectangle.draw()

  const square: Square = shapeFactory.getShape('square')
  square.draw()

  const roundedShapeFactory: AbstractShapeFactory = ShapeFactoryProducer.getFactory(true)

  const roundedRectangle: RoundedRectangle = roundedShapeFactory.getShape('rectangle')
  roundedRectangle.draw()

  const roundedSquare: RoundedSquare = roundedShapeFactory.getShape('square')
  roundedSquare.draw()
}

// Output:
// Inside Rectangle::draw() method.
// Inside Square::draw() method.
// Inside RoundedRectangle::draw() method.
// Inside RoundedSquare::draw() method.
