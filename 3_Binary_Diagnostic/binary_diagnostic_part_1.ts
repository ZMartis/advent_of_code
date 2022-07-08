import { each, join, map, parseInt, toNumber } from 'lodash'
import { inputNumbers } from './input'

let gammaRate = ''
let epsilonRate = ''

function tallyDigitsInNumbers() {
  const totaledNumbers: number[] = []
  each(inputNumbers, (inputNumber) => {
    each(inputNumber, (digit, index) => {
      if (toNumber(digit) === 1 && totaledNumbers[index]) {
        totaledNumbers[index] = totaledNumbers[index] + 1
      } else if (toNumber(digit) === 1) {
        totaledNumbers[index] = 1
      }
    })
  })
  return totaledNumbers
}

function determineRates() {
  gammaRate = join(
    map(tallyDigitsInNumbers(), (number) =>
      number < inputNumbers.length / 2 ? 0 : 1
    ),
    ''
  )
  epsilonRate = join(
    map(gammaRate, (digit) => (digit === '0' ? '1' : '0')),
    ''
  )
}

function binaryToDecimalConversion(rate: string) {
  return parseInt(rate, 2)
}

determineRates()
console.log(
  binaryToDecimalConversion(gammaRate) * binaryToDecimalConversion(epsilonRate)
)
