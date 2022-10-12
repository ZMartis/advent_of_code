import { readFileSync } from 'fs'
import { each, includes, map, max, min, split, sum, toNumber } from 'lodash'

const input = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (stringNumber) => toNumber(stringNumber)
)

const preambleLength = 25
const currentPreambleList: number[] = []

let nextIndex = preambleLength
let nextIndexValue: number
let erroredNumber: number | null = null

let sumOfFinalSet: number | null = null

function run() {
  initializePreambleList()
  while (erroredNumber == null) {
    nextIndexValue = input[nextIndex]
    if (checkValueHasSumValuesInPreamble()) {
      nextIndex++
      updatePreamble()
    } else {
      erroredNumber = nextIndexValue
    }
  }
  const finalSumList = contiguousSet(erroredNumber)
  const largestNumber = max(finalSumList)
  const smallestNumber = min(finalSumList)
  if (largestNumber !== undefined && smallestNumber !== undefined) {
    sumOfFinalSet = largestNumber + smallestNumber
  }
}

// helper functions ------------------------

function initializePreambleList() {
  for (let i = 0; i < preambleLength; i++) {
    currentPreambleList.push(input[i])
  }
}
function checkValueHasSumValuesInPreamble() {
  let preambleContainsSumValues: boolean = false
  each(currentPreambleList, (number) => {
    if (number < nextIndexValue) {
      const numberToCheck = nextIndexValue - number
      if (
        number !== numberToCheck &&
        includes(currentPreambleList, numberToCheck)
      ) {
        preambleContainsSumValues = true
      }
    }
  })
  return preambleContainsSumValues
}
function updatePreamble() {
  currentPreambleList.shift
  currentPreambleList.push(nextIndexValue)
}
function contiguousSet(erroredNumber: number): number[] | null {
  let startingIndex = 0
  let finalSumList: number[] | null = null
  each(input, (number) => {
    let currentIndex = startingIndex
    let currentNumber = input[currentIndex]
    let numberList: number[] = []
    if (number !== erroredNumber) {
      while (sum(numberList) < erroredNumber) {
        currentIndex++
        currentNumber = input[currentIndex]
        numberList.push(currentNumber)
      }
      if (sum(numberList) === erroredNumber) {
        finalSumList = numberList
      } else {
        startingIndex++
      }
    }
  })
  return finalSumList
}

// ----------

run()
console.log(sumOfFinalSet)
