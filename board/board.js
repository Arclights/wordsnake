const _ = require('lodash')

const generatePositions = (width, height) => {
  return _.flatten(_.range(width).map(x => _.range(height).map(y => new Position(x, y))))
}

class Position {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class Word {
  constructor (chars) {
    this.chars = chars
    this.letters = chars.map(c => new Letter(c))
  }
}

class Letter {
  constructor (char) {
    this.char = char
    this.position = undefined
  }
}

const randomInt = max => Math.floor(Math.random() * Math.floor(max))

const createNewPosition = (position, xOffset, yOffset) => new Position(position.x + xOffset, position.y + yOffset)

const getNextPositions = (previousPosition, availablePositions) => {
  if (previousPosition === undefined) {
    availablePositions.splice(randomInt(availablePositions.length), 1)
  } else {
    const potentialPositions = [
      createNewPosition(previousPosition, -1, -1),
      createNewPosition(previousPosition, -1, 1),
      createNewPosition(previousPosition, 0, 1),
      createNewPosition(previousPosition, 1, 1),
      createNewPosition(previousPosition, 1, 0),
      createNewPosition(previousPosition, 1, -1),
      createNewPosition(previousPosition, 0, -1),
      createNewPosition(previousPosition, -1, -1)
    ]
    const possiblePositions = _.union(potentialPositions, availablePositions)

    if (possiblePositions.length === 0) {
      return undefined
    }

    return possiblePositions[randomInt(possiblePositions.length)]
  }
}

const generateWordChain = (previousLetter, letters, availablePositions) => {
  // Recursive
}

class Board {
  constructor (width, height) {
    this.height = height
    this.width = width
    this.possiblePositions = generatePositions(width, height)
    this.words = []
  }

  addWord (word) {
    const w = new Word(word)
    const chain = generateWordChain(undefined, w.letters, this.availablePositions)
    this.words.push(w)
    this.availablePositions = _.difference(chain.map(l => l.position), this.availablePositions)
  }

  availablePositions () {
    return _.difference(this.possiblePositions, this.usedPositions())
  }

  isFull () {
    return this.spaceLeft() === this.size()
  }

  size () {
    return this.width * this.height
  }

  spaceLeft () {
    return this
      .usedPositions()
      .length
  }

  usedPositions () {
    return _.flatten(this.words.map(w => w.map(l => l.position)))
  }
}

module.exports = Board
