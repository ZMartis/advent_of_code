import { readFileSync } from 'fs'
import { every, filter, map, some, split, toNumber, toString } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), '-'), (string) =>
  toNumber(string)
)

// -------------------------

const validPasswords: number[] = []

for (let i = input[0]; i <= input[1]; i++) {
  if (numberHasAdjacentRepeatedDigits(i) && numbersNeverDecrease(i)) {
    validPasswords.push(i)
  }
}

function numberHasAdjacentRepeatedDigits(number: number): boolean {
  const stringNumber = toString(number)
  const mapping = map(
    stringNumber,
    (digit, index) => digit === stringNumber[index + 1]
  )
  const booleanMapping = map(
    mapping,
    (boolean, index) =>
      boolean === true &&
      boolean !== mapping[index + 1] &&
      boolean !== mapping[index - 1]
  )
  return some(booleanMapping)
}

function numbersNeverDecrease(number: number): boolean {
  const stringNumber = toString(number)
  const mapping = map(
    stringNumber,
    (digit, index) => toNumber(digit) <= toNumber(stringNumber[index + 1])
  )
  mapping.pop()
  return every(mapping)
}

console.log(validPasswords.length)
