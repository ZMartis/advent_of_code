import { readFileSync } from 'fs'
import {
  each,
  filter,
  includes,
  map,
  sortBy,
  split,
  toNumber,
  toString,
} from 'lodash'

const floorNumbers: number[][] = map(
  split(readFileSync('./input.txt', 'utf-8'), '\n'),
  (array) => {
    return [...map(split(array, ''), (number) => toNumber(number))]
  }
)

// -------------------------------------------------------------

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

function scanBasinSizesFromLowPoints() {
  const locationsInEachBasin = map(filterLowPoints(), ([location, value]) => {
    const locationsChecked: string[] = []
    const locationsWithinBasin: string[] = []
    scanBasin(location, value)

    function scanBasin(location: string, value: number | undefined) {
      locationsChecked.push(location)
      if (value !== 9 && value !== undefined) {
        locationsWithinBasin.push(location)
        const numberLocation = parseMapLocation(location)
        const leftLocation = stringifyMapLocation([
          numberLocation[0],
          numberLocation[1] - 1,
        ])
        const rightLocation = stringifyMapLocation([
          numberLocation[0],
          numberLocation[1] + 1,
        ])
        const aboveLocation = stringifyMapLocation([
          numberLocation[0] - 1,
          numberLocation[1],
        ])
        const belowLocation = stringifyMapLocation([
          numberLocation[0] + 1,
          numberLocation[1],
        ])
        if (!includes(locationsChecked, leftLocation)) {
          scanBasin(leftLocation, floorMapping.get(leftLocation))
        }
        if (!includes(locationsChecked, rightLocation)) {
          scanBasin(rightLocation, floorMapping.get(rightLocation))
        }
        if (!includes(locationsChecked, aboveLocation)) {
          scanBasin(aboveLocation, floorMapping.get(aboveLocation))
        }
        if (!includes(locationsChecked, belowLocation)) {
          scanBasin(belowLocation, floorMapping.get(belowLocation))
        }
      }
    }
    return locationsWithinBasin
  })
  return locationsInEachBasin
}

function calculateAnswer() {
  const basinSizes = map(scanBasinSizesFromLowPoints(), (basin) => basin.length)
  const sortedBasinSizes = sortBy(basinSizes)
  const numberOfBasins = sortedBasinSizes.length
  return (
    sortedBasinSizes[numberOfBasins - 1] *
    sortedBasinSizes[numberOfBasins - 2] *
    sortedBasinSizes[numberOfBasins - 3]
  )
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
console.log(calculateAnswer())
