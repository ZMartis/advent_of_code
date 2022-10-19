import { readFileSync } from 'fs'
import { each, map, min, sortBy, split, sum, toNumber } from 'lodash'

const sortedList = sortBy(
  map(split(readFileSync('input.txt', 'utf-8'), '\n'), (stringNumber) =>
    toNumber(stringNumber)
  )
)

const compatableIndexMapping = new Map<number, number[]>()
const sumMapping = new Map<number, number>()

function numberOfPathsForIndex(index: number): number {
  if (index === sortedList.length - 1) {
    sumMapping.set(index, 1)
    return 1
  }
  sumMapping.set(
    index,
    sum(
      map(compatableIndexMapping.get(index), (compatableIndex) => {
        const returnedFromSumMapping = sumMapping.get(compatableIndex)
        if (returnedFromSumMapping !== undefined) {
          return returnedFromSumMapping
        } else {
          return numberOfPathsForIndex(compatableIndex)
        }
      })
    )
  )
  return sumMapping.get(index) as number
}

// helper functions ----------------

function addWallAndDeviceValuesToList() {
  sortedList.unshift(0)
  sortedList.push(sortedList[sortedList.length - 1] + 3)
}

function setIndexMapping() {
  each(sortedList, (_value, index) => {
    const nextPossibleAdapterIndexes = findNextPossibleAdapterIndexes(index)
    compatableIndexMapping.set(index, nextPossibleAdapterIndexes)
  })
}

function findNextPossibleAdapterIndexes(index: number) {
  const possibleIndexes: number[] = []
  for (
    let i = index + 1;
    i >= index + 1 && i < (min([index + 4, sortedList.length]) as number);
    i++
  ) {
    if (sortedList[i] - sortedList[index] <= 3) {
      possibleIndexes.push(i)
    }
  }
  return possibleIndexes
}

// ---------------

addWallAndDeviceValuesToList()
setIndexMapping()
console.log(numberOfPathsForIndex(0))
