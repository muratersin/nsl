interface Item {
  name: () => string
  packing: () => Packing
  price: () => number
}

interface Packing {
  pack: () => string
}

class Wrapper implements Packing {
  pack(): string {
     return 'Wrapper'
  }
}

class Bottle implements Packing {
  pack(): string {
    return 'Bottle'
  }
}

abstract class Burger implements Item {
  abstract price(): number
  abstract name(): string

  packing(): Packing {
    return new Wrapper()
  }
}

abstract class ColdDring implements Item {
  abstract price(): number
  abstract name(): string

  packing() {
    return new Bottle()
  }
}

class VegBurger extends Burger {
  price() {
    return 25
  }

  name() {
    return 'Veg Burger'
  }
}

class ChickenBurger extends Burger {
  price() {
    return 50
  }

  name() {
    return 'Chicken Burger'
  }
}

class Coke extends Burger {
  price() {
    return 30
  }

  name() {
    return 'Coke'
  }
}

class Pepsi extends Burger {
  price() {
    return 35
  }

  name() {
    return 'Pepsi'
  }
}

class Meal {
  items: Item[] = []

  addItem(item: Item): void {
    this.items.push(item)
  }

  getCost() {
    let cost = 0;

    for (const item of this.items) {
      cost = cost + item.price()
    }

    return cost
  }

  showItems() {
    for (const item of this.items) {
      console.log('')
      console.log(`Item: ${item.name()}`)
      console.log(`Packing: ${item.packing()}`)
      console.log(`Price: ${item.price()}`)
      console.log('')
    }
  }
}

class MealBuilder {
  prepareVegMeal(): Meal {
    const meal = new Meal()
    meal.addItem(new VegBurger())
    meal.addItem(new Coke())
    return meal
  }

  prepareNonVegMeal(): Meal {
    const meal = new Meal()
    meal.addItem(new ChickenBurger())
    meal.addItem(new Pepsi())
    return meal
  }
}

function mealApp() {
  const mealBuilder = new MealBuilder()

  const vegMeal = mealBuilder.prepareVegMeal()
  console.log('Veg Meal')
  vegMeal.showItems()
  console.log(`Total cost: ${vegMeal.getCost()}`)

  const vegMenonVegMeal = mealBuilder.prepareNonVegMeal()
  console.log('Non Veg Meal')
  vegMenonVegMeal.showItems()
  console.log(`Total cost: ${vegMenonVegMeal.getCost()}`)
}