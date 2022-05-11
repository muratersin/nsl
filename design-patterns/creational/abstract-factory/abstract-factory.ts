/**
 * The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
 interface AbstractFurnitureFactory {
  createChair(): Chair;

  createTable(): Table;
}

/**
* Concrete Factories produce a family of products that belong to a single
* variant. The factory guarantees that resulting products are compatible. Note
* that signatures of the Concrete Factory's methods return an abstract product,
* while inside the method a concrete product is instantiated.
*/
class VictorianFurnitureFactory implements AbstractFurnitureFactory {
  public createChair(): Chair {
      return new VictorianChair();
  }

  public createTable(): Table {
      return new VictorianTable();
  }
}

/**
* Each Concrete Factory has a corresponding product variant.
*/
class ModernFurnitureFactory implements AbstractFurnitureFactory {
  public createChair(): Chair {
      return new ModernChair();
  }

  public createTable(): Table {
      return new ModernTable();
  }
}

/**
* Each distinct product of a product family should have a base interface. All
* variants of the product must implement this interface.
*/
interface Chair {
  getChairType(): string;
}

/**
* These Concrete Products are created by corresponding Concrete Factories.
*/
class VictorianChair implements Chair {
  public getChairType(): string {
      return 'This is a Victorian chair';
  }
}

class ModernChair implements Chair {
  public getChairType(): string {
      return 'This is a Modern chair';
  }
}

/**
* Here's the the base interface of another product. All products can interact
* with each other, but proper interaction is possible only between products of
* the same concrete variant.
*/
interface Table {
  /**
   * Product B is able to do its own thing...
   */
  getTableType(): string;

  /**
   * ...but it also can collaborate with the ProductA.
   *
   * The Abstract Factory makes sure that all products it creates are of the
   * same variant and thus, compatible.
   */
  showFurnitureType(collaborator: Chair): string;
}

/**
* These Concrete Products are created by corresponding Concrete Factories.
*/
class VictorianTable implements Table {

  public getTableType(): string {
    return 'This is a Victorian table.';
  }

  /**
   * The variant, Product B1, is only able to work correctly with the variant,
   * Product A1. Nevertheless, it accepts any instance of Chair as
   * an argument.
   */
  public showFurnitureType(collaborator: Chair): string {
      const result = collaborator.getChairType();
      return `The result of the B1 collaborating with the (${result})`;
  }
}

class ModernTable implements Table {

  public getTableType(): string {
      return 'This is a Modern table.';
  }

  /**
   * The variant, Product B2, is only able to work correctly with the variant,
   * Product A2. Nevertheless, it accepts any instance of Chair as
   * an argument.
   */
  public showFurnitureType(collaborator: Chair): string {
      const result = collaborator.getChairType();
      return `The result of the B2 collaborating with the (${result})`;
  }
}

/**
* The client code works with factories and products only through abstract
* types: AbstractFurnitureFactory and AbstractProduct. This lets you pass any factory or
* product subclass to the client code without breaking it.
*/
function abstractFactoryDemo(factory: AbstractFurnitureFactory) {
  const productA = factory.createChair();
  const productB = factory.createTable();

  console.log(productB.getTableType());
  console.log(productB.showFurnitureType(productA));
}

/**
* The client code can work with any concrete factory class.
*/
console.log('Client: Testing client code with the first factory type...');
abstractFactoryDemo(new VictorianFurnitureFactory());

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
abstractFactoryDemo(new ModernFurnitureFactory());
