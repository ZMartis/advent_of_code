import { readFileSync } from 'fs'
import { each, filter, map, split, sum, toNumber, toString } from 'lodash'

const floorNumbers: number[][] = map(
  split(readFileSync('./input.txt', 'utf-8'), '\n'),
  (array) => {
    return [...map(split(array, ''), (number) => toNumber(number))]
  }
)

// -----------------------------------------------

const floorMapping = new Map<string, number>()
function setFloorMapping() {
  each(floorNumbers, (numberArray, rowIndex) => {
    each(numberArray, (number, columnIndex) =>
      floorMapping.set(toString(rowIndex) + ',' + toString(columnIndex), number)
    )
  })
}
function filterLowPoints() {
  return filter([...floorMapping], ([key, value]) => {
    const location = parseMapLocation(key)
    const leftLocation = stringifyMapLocation([location[0], location[1] - 1])
    const rightLocation = stringifyMapLocation([location[0], location[1] + 1])
    const aboveLocation = stringifyMapLocation([location[0] - 1, location[1]])
    const belowLocation = stringifyMapLocation([location[0] + 1, location[1]])
    return (
      compareValues(value, floorMapping.get(leftLocation)) &&
      compareValues(value, floorMapping.get(rightLocation)) &&
      compareValues(value, floorMapping.get(aboveLocation)) &&
      compareValues(value, floorMapping.get(belowLocation))
    )
  })
}
function calculateSumOfRisk() {
  const allRiskValues = map(
    filterLowPoints(),
    ([_location, value]) => value + 1
  )
  return sum(allRiskValues)
}

// Helper Functions
function parseMapLocation(mapLocation: string): number[] {
  return map(split(mapLocation, ',', 2), (number) => toNumber(number))
}
function stringifyMapLocation(numberLocation: number[]): string {
  return toString(numberLocation[0]) + ',' + toString(numberLocation[1])
}
function compareValues(
  currentValue: number,
  numberToCheck: number | undefined
) {
  return numberToCheck !== undefined ? currentValue < numberToCheck : true
}

setFloorMapping()
console.log(calculateSumOfRisk())
