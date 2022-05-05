interface IRoundPeg {
  getRadius: () => number
}

interface IRoundHole {
  getRadius: () => number
  fits: (peg: IRoundPeg) => boolean
}

interface ISquarePeg {
  getWidth: () => number

}

interface ISquareHole {
  getWidth: () => number
  fits: (peg: ISquarePeg) => boolean
}

// Say you have two classes with compatible interfaces:
// RoundHole and RoundPeg.
class RoundHole implements IRoundHole {
  private _radius: number

  constructor(radius: number) {
    this._radius = radius
  }

  getRadius(): number {
    return this._radius
  }

  fits(peg: IRoundPeg): boolean {
    return this.getRadius() >= peg.getRadius()
  }
}

class RoundPeg implements IRoundPeg {
  private _redius: number

  constructor(radius: number) {
    this._redius = radius
  }

  getRadius() {
    return this._redius
  }
}

class SquarePeg implements ISquarePeg {
  private _width: number

  constructor(width: number) {
    this._width = width
  }

  getWidth() {
    return this._width
  }
}

class SquarePegAdapter extends RoundPeg {
  private _peg: SquarePeg

  constructor(peg: SquarePeg) {
    super(peg.getWidth() * Math.sqrt(2) / 2)
    this._peg = peg
  }

  getRadius(): number {
    return this._peg.getWidth() * Math.sqrt(2) / 2
  }
}

function pegHoleApp() {
  const hole = new RoundHole(5)
  const roundPeg = new RoundPeg(5)
  hole.fits(roundPeg) // true

  const smallSquarePeg = new SquarePeg(5)
  const largeSquarePeg = new SquarePeg(10)
  // hole.fits(smallSquarePeg) // this won't compile (incompatible types)

  const smallSquarePegAdapter = new SquarePegAdapter(smallSquarePeg)
  const largeSquarepegAdapter = new SquarePegAdapter(largeSquarePeg)
  hole.fits(smallSquarePegAdapter) // true
  hole.fits(largeSquarepegAdapter) // false
}