import { readFileSync } from 'fs'
import { each, includes, map, split, toNumber } from 'lodash'

const input = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (stringNumber) => toNumber(stringNumber)
)

const preambleLength = 25
const currentPreambleList: number[] = []

let nextIndex = preambleLength
let nextIndexValue: number
let finalAnswerNumber: number | null = null

function run() {
  initializePreambleList()
  while (finalAnswerNumber == null) {
    nextIndexValue = input[nextIndex]
    if (checkValueHasSumValuesInPreamble()) {
      nextIndex++
      updatePreamble()
    } else {
      finalAnswerNumber = nextIndexValue
    }
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

// ----------

run()
console.log(finalAnswerNumber)
