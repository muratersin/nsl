// The product interface declares the operations that all
// concrete products must implement.
interface Button {
  render: Function;
  onClick: (f: Function) => void;
}

// The creator class declares the factory method that must
// return an object of a product class. The creator's subclasses
// usually provide the implementation of this method.
export abstract class Dialog {
   // The creator may also provide some default implementation
    // of the factory method.
  abstract createButton(): Button

  close() {
    console.log('Dialog is closed')
  }

  // Note that, despite its name, the creator's primary
  // responsibility isn't creating products. It usually
  // contains some core business logic that relies on product
  // objects returned by the factory method. Subclasses can
  // indirectly change that business logic by overriding the
  // factory method and returning a different type of product
  // from it.
  render() {
    // Call the factory method to create a product object.
    const okButton: Button = this.createButton()
     // Now use the product.
    okButton.onClick(this.close)
    okButton.render()
  }
}


// Concrete creators override the factory method to change the
// resulting product's type.
export class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton()
  }
}

export class LinuxDialog extends Dialog {
  createButton(): Button {
    return new LinuxButton()
  }
}

export class MacOsDialog extends Dialog {
  createButton(): Button {
    return new MacOsButton()
  }
}

// Concrete products provide various implementations of the
// product interface.
class WindowsButton implements Button {
  render() {
    console.log('windows button rendered')
  }

  onClick(f: Function) {
    console.log('windows button clicked')
    f()
  }
}

class LinuxButton implements Button {
  render() {
    console.log('linux button rendered')
  }

  onClick(f: Function) {
    console.log('linux button clicked')
    
    f()
  }
}

class MacOsButton implements Button {
  render() {
    console.log('macos button rendered')
  }

  onClick(f: Function) {
    console.log('macos button clicked')

    f()
  }
}

const dialog = new WindowsDialog();

dialog.render()