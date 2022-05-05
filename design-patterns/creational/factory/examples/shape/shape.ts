export interface Shape {
  draw: () => void
}

class Rectangle implements Shape {
  draw() {
    console.log("Inside Rectangle::draw() method.")
  }
}

class Square implements Shape {
  draw() {
    console.log("Inside Square::draw() method.")
  }
}

class Circle implements Shape {
  draw() {
    console.log("Inside Circle::draw() method.")
  }
}

export class ShapeFactory {

  getShape(shapeType: string): Shape {
    if (!shapeType) {
      return null
    }

    if (shapeType === 'rectangle') {
      return new Rectangle()
    }

    if (shapeType === 'square') {
      return new Square()
    }

    if (shapeType === 'circle') {
      return new Circle()
    }

    return null
  }
}