import { readFileSync } from 'fs'
import { includes, split, toNumber } from 'lodash'

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

const indexesRun: number[] = []

let accumulator = 0
let currentIndex = 0

function run(input) {
  while (!includes(indexesRun, currentIndex) && currentIndex < input.length) {
    const command = split(input[currentIndex], ' ')[0]
    const number = toNumber(split(input[currentIndex], ' ')[1])

    if (command === 'acc') {
      accumulator += number
      indexesRun.push(currentIndex)
      currentIndex++
    } else if (command === 'jmp') {
      checkReverse()
      indexesRun.push(currentIndex)
      currentIndex += number
    } else if (command === 'nop') {
      checkReverse()
      indexesRun.push(currentIndex)
      currentIndex++
    }
  }
}

function checkReverse() {
  const inputCopy = input
  let command = split(inputCopy[currentIndex], ' ')[0]
  let number = toNumber(split(inputCopy[currentIndex], ' ')[1])

  if (command === 'jmp') {
    inputCopy[currentIndex] === `nop ${number}`
  } else {
    inputCopy[currentIndex] === `jmp ${number}`
  }
}

console.log(accumulator)
