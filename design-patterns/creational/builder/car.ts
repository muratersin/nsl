interface Engine {
  engineType: string
  hp: number
}


class EcoEngine implements Engine {
  engineType = 'eco'
  hp = 105
}

class SportEngine implements Engine {
  engineType = 'sport'
  hp = 280
}


class Car {
  seats: number;
  engine: Engine;
  
  setSeats(count: number) {
    this.seats = count
  }

  setEngine(engine: Engine) {
    this.engine = engine
  }
}

class Manual {
  seatManual: string
  engineManual: string
  
  setSeatManual(count: number) {
    this.seatManual = `This car has ${count} seat`
  }

  setEngineManual(engine: Engine) {
    this.engineManual = `This car has a ${engine.engineType} engine`
  }
}

interface Builder {
  reset: Function
  setSeats: Function
  setEngine: Function
}

class CarBuilder implements Builder {
  private car: Car

  constructor() {
    this.reset()
  }

  reset() {
    this.car = new Car()
  }

  setSeats(count: number) {
    this.car.setSeats(count)
  }

  setEngine(engine: Engine) {
    this.car.setEngine(engine)
  }

  getProduct(): Car {
    const car = this.car;
    this.reset()
    return car
  }
}

class CarManualBuilder implements Builder {
  private manual: Manual
  seatManual: string
  engineManual: string

  constructor() {
    this.reset()
  }

  reset() {
    this.manual = new Manual()
  }

  setSeats(count: number) {
    this.manual.setSeatManual(count)
  }

  setEngine(engine: Engine) {
    this.manual.setEngineManual(engine)
  }

  getProduct(): Manual {
    const manual = this.manual;
    this.reset()
    return manual
  }
}

class Director {
  private builder: Builder

  setBuilder(builder: Builder) {
    this.builder = builder
  }

  constructSportCar(b: Builder) {
    const builder = b || this.builder;

    builder.reset()
    builder.setSeats(2)
    builder.setEngine(new SportEngine())
  }

  constructEcoCar(b: Builder) {
    const builder = b || this.builder;

    builder.reset()
    builder.setSeats(5)
    builder.setEngine(new EcoEngine())
  }
}

function main() {
  const director = new Director()

  const carBuilder = new CarBuilder()
  director.constructSportCar(carBuilder)
  const sportCar: Car = carBuilder.getProduct()

  console.log(`New sport car created has ${sportCar.seats} seats and a ${sportCar.engine.engineType} engine.`)

  const carManualBuilder = new CarManualBuilder()
  director.constructSportCar(carManualBuilder)
  const sportCardManuel: Manual = carManualBuilder.getProduct()

  console.log(`Car Manual: Seats: ${sportCardManuel.seatManual} - Engine: ${sportCardManuel.engineManual}.`)
}

main()