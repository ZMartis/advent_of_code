import { readFileSync } from 'fs'
import { each, every, filter, map, some, split, toNumber } from 'lodash'

enum SeatState {
  Floor = '.',
  Empty = 'L',
  Occupied = '#',
}

const input = map(split(readFileSync('input.txt', 'utf-8'), '\n'), (row) =>
  split(row, '')
) as SeatState[][]

let currentMapping = new Map<string, SeatState>()
let nextMapping = new Map<string, SeatState>()

function run() {
  setCurrentMapping()

  while (!identicalMaps()) {
    each([...currentMapping], ([position, value]) => {
      if (value === SeatState.Empty && emptyShouldChange(position)) {
        nextMapping.set(position, SeatState.Occupied)
      } else if (
        value === SeatState.Occupied &&
        occupiedShouldChange(position)
      ) {
        nextMapping.set(position, SeatState.Empty)
      } else {
        nextMapping.set(position, value)
      }
    })

    if (!identicalMaps()) {
      currentMapping = new Map(nextMapping)
      nextMapping.clear()
    }
  }

  return filter(
    [...nextMapping],
    ([_position, value]) => value === SeatState.Occupied
  ).length
}

// ----------------------------------------------

function setCurrentMapping(): void {
  each(input, (row, rowIndex) => {
    each(row, (column, columnIndex) => {
      currentMapping.set(`${columnIndex},${rowIndex}`, column)
    })
  })
}

function identicalMaps(): boolean {
  return every(
    map(
      [...currentMapping],
      ([position, value]) => value === nextMapping.get(position)
    ),
    (boolean) => boolean === true
  )
}

function emptyShouldChange(position: string): boolean {
  const visibleValues = surroundingDirectionsValues(
    convertPositionToNumbers(position)
  )
  return !some(
    visibleValues,
    (visibleValue) => visibleValue === SeatState.Occupied
  )
}

function occupiedShouldChange(position: string): boolean {
  const visibleValues = surroundingDirectionsValues(
    convertPositionToNumbers(position)
  )
  const filteredValues = filter(
    visibleValues,
    (visibleValue) => visibleValue === SeatState.Occupied
  )
  return filteredValues.length >= 5
}

function surroundingDirectionsValues(
  position: number[]
): (SeatState | undefined)[] {
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ]

  return map(directions, (direction) => {
    let distance = 1
    const positionToCheck = () =>
      `${position[0] + direction[0] * distance},${
        position[1] + direction[1] * distance
      }`
    while (currentMapping.get(positionToCheck()) === SeatState.Floor) {
      distance++
    }
    return currentMapping.get(positionToCheck())
  })
}

function convertPositionToNumbers(stringPosition: string): number[] {
  return map(split(stringPosition, ','), (stringNumber) =>
    toNumber(stringNumber)
  )
}

console.log(run())
