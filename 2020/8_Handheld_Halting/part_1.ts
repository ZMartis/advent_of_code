import { readFileSync } from 'fs'
import { includes, split, toNumber } from 'lodash'

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

const indexesRun: number[] = []
let accumulator = 0
let currentIndex = 0
while (!includes(indexesRun, currentIndex)) {
  const command = split(input[currentIndex], ' ')[0]
  const number = toNumber(split(input[currentIndex], ' ')[1])
  if (command === 'acc') {
    accumulator += number
    indexesRun.push(currentIndex)
    currentIndex++
  } else if (command === 'jmp') {
    indexesRun.push(currentIndex)
    currentIndex += number
  } else if (command === 'nop') {
    indexesRun.push(currentIndex)
    currentIndex++
  }
}
console.log(accumulator)
