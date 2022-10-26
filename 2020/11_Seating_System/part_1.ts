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
      if (value === SeatState.Empty) {
        toBeOccupied(position, value)
      } else if (value === SeatState.Occupied) {
        toBeEmpty(position, value)
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

// ------------------------------------------

function identicalMaps() {
  return every(
    map(
      [...currentMapping],
      ([position, value]) => value === nextMapping.get(position)
    ),
    (boolean) => boolean === true
  )
}

function setCurrentMapping() {
  each(input, (row, rowIndex) => {
    each(row, (column, columnIndex) => {
      currentMapping.set(`${columnIndex},${rowIndex}`, column)
    })
  })
}

function toBeOccupied(position: string, value: SeatState) {
  const surroundingValues = surroundingPositionsValues(
    convertPositionToNumbers(position)
  )
  if (
    !some(
      surroundingValues,
      (surroundingValue) => surroundingValue === SeatState.Occupied
    )
  ) {
    nextMapping.set(position, SeatState.Occupied)
  } else {
    nextMapping.set(position, value)
  }
}

function toBeEmpty(position: string, value: SeatState) {
  const surroundingValues = surroundingPositionsValues(
    convertPositionToNumbers(position)
  )
  const filteredValues = filter(
    surroundingValues,
    (surroundingValue) => surroundingValue === SeatState.Occupied
  )
  if (filteredValues.length >= 4) {
    nextMapping.set(position, SeatState.Empty)
  } else {
    nextMapping.set(position, value)
  }
}

function surroundingPositionsValues(
  position: number[]
): (SeatState | undefined)[] {
  const positionsToCheck = [
    `${position[0] - 1},${position[1] - 1}`,
    `${position[0]},${position[1] - 1}`,
    `${position[0] + 1},${position[1] - 1}`,
    `${position[0] - 1},${position[1]}`,
    `${position[0] + 1},${position[1]}`,
    `${position[0] - 1},${position[1] + 1}`,
    `${position[0]},${position[1] + 1}`,
    `${position[0] + 1},${position[1] + 1}`,
  ]
  return map(positionsToCheck, (stringPosition) =>
    currentMapping.get(stringPosition)
  )
}

function convertPositionToNumbers(stringPosition: string): number[] {
  return map(split(stringPosition, ','), (stringNumber) =>
    toNumber(stringNumber)
  )
}

console.log(run())
