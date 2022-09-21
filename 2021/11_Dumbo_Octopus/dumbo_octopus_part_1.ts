import { readFileSync } from 'fs'
import { each, map, some, split, toNumber } from 'lodash'

const inputMapping = new Map<string, number>()
each(split(readFileSync('./input.txt', 'utf-8'), '\n'), (row, rowIndex) => {
  each(row, (column, columnIndex) =>
    inputMapping.set(`${rowIndex},${columnIndex}`, toNumber(column))
  )
})
let numberOfFlashes = 0

// ------------------------

function progressStep() {
  increaseNumbers()
  recursiveFlash()
}
function increaseNumbers() {
  each([...inputMapping], (position) =>
    inputMapping.set(position[0], position[1] + 1)
  )
}
function recursiveFlash() {
  each([...inputMapping], ([position, number]) => {
    if (number > 9) {
      inputMapping.set(position, 0)
      numberOfFlashes++
      setSurroundingNumbers(position)
    }
  })
  if (containsNumbersAboveNine()) {
    recursiveFlash()
  }
}
function setSurroundingNumbers(position: string) {
  const startingPosition: number[] = positionToNumbers(position)
  const surroundingTranslations = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
  each(surroundingTranslations, (positionAdditions) => {
    const newPosition = `${startingPosition[0] + positionAdditions[0]},${
      startingPosition[1] + positionAdditions[1]
    }`
    const positionValue = inputMapping.get(newPosition)
    positionValue !== undefined && positionValue !== 0
      ? inputMapping.set(newPosition, positionValue + 1)
      : ''
  })
}

// Helper functions

function containsNumbersAboveNine() {
  return some(
    map([...inputMapping], ([_position, value]) => value),
    (value) => value > 9
  )
}
function positionToNumbers(position: string) {
  return map(split(position, ','), (string) => toNumber(string))
}

// Run functions

let i = 0
while (i < 100) {
  progressStep()
  i++
}

console.log(numberOfFlashes)
