import { each, filter, parseInt, toNumber } from 'lodash'
import { inputNumbers } from './input'

let oxygenRatingList = inputNumbers
let CO2RatingList = inputNumbers
let oxygenIndex = 0
let CO2Index = 0

while (oxygenRatingList.length > 1) {
  oxygenRatingList = filterList(
    oxygenRatingList,
    findMostCommonDigit(oxygenRatingList, oxygenIndex),
    oxygenIndex
  )
  oxygenIndex++
}
while (CO2RatingList.length > 1) {
  CO2RatingList = filterList(
    CO2RatingList,
    findLeastCommonDigit(CO2RatingList, CO2Index),
    CO2Index
  )
  CO2Index++
}

function filterList(list: string[], digit: number, index: number) {
  return filter(list, (number) => toNumber(number[index]) === digit)
}

function findMostCommonDigit(list: string[], index: number) {
  return tallyDigitsForIndex(list, index) < list.length / 2 ? 0 : 1
}

function findLeastCommonDigit(list: string[], index: number) {
  return tallyDigitsForIndex(list, index) < list.length / 2 ? 1 : 0
}

function tallyDigitsForIndex(list: string[], index: number) {
  let total = 0
  each(list, (number) => {
    if (toNumber(number[index]) === 1) {
      total++
    }
  })
  return total
}

function binaryToDecimalConversion(rate: string) {
  return parseInt(rate, 2)
}

console.log(
  binaryToDecimalConversion(oxygenRatingList[0]) *
    binaryToDecimalConversion(CO2RatingList[0])
)
