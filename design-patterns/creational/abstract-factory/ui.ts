// The abstract factory interface declares a set of methods that
// return different abstract products. These products are called
// a family and are related by a high-level theme or concept.
// Products of one family are usually able to collaborate among
// themselves. A family of products may have several variants,
// but the products of one variant are incompatible with the
export interface GUIFactory {
  createButton: () => Button
  createCheckbox: () => Checkbox
}

// Each distinct product of a product family should have a base
// interface. All variants of the product must implement this
// interface.
export interface Button {
  paint: () => void
}

// Here's the base interface of another product. All products
// can interact with each other, but proper interaction is
// possible only between products of the same concrete variant.
export interface Checkbox {
  paint: () => void
}

export class WinFactory implements GUIFactory {
  createButton(): Button {
    return new WinButton()
  }

  createCheckbox(): Checkbox {
    return new WinCheckbox()
  }
}

export class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton()
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox()
  }
}

// Concrete products are created by corresponding concrete
// factories.
class WinButton {
  paint() {
    console.log('paint::WinButton')
  }
}

class MacButton {
  paint() {
    console.log('paint::MacButton')
  }
}

class WinCheckbox {
  paint() {
    console.log('paint::WinCheckbox')
  }
}

class MacCheckbox {
  paint() {
    console.log('paint::MacCheckbox')
  }
}


class Application {
  private factory: GUIFactory
  private button: Button

  constructor(factory: GUIFactory) {
    this.factory = factory
  }

  createUI() {
    this.button = this.factory.createButton()
  }

  paint() {
    this.button.paint()
  }
}

class ApplicationConfigurator {
  main() {
    const config = { OS: 'Mac' }
    let factory: GUIFactory;

    if (config.OS === 'Windows') {
      factory = new WinFactory()
    } if (config.OS === 'Mac') {
      factory = new MacFactory()
    } else {
      throw new Error('Error! Unknown operating system.')
    }

    const app = new Application(factory)

    app.paint()
    // Outpu:
    // paint::MacButton
  }
}

