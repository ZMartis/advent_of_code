import { readFileSync } from 'fs'

type Direction = {
  count: number
  from: number
  to: number
}

const input = readFileSync('input.txt', 'utf-8').split('\n\n')
const stackRows = input[0].split('\n')
stackRows.pop()

const stacks: string[][] = []
for (let i = 0; i < 9; i++) {
  stacks.push([])
}
stackRows.forEach((row) => {
  for (let column = 0; column < 9; column++) {
    if (row[column * 4 + 1] !== ' ') {
      stacks[column].unshift(row[column * 4 + 1])
    }
  }
})

const directions: Direction[] = input[1].split('\n').map((line) => {
  const splitLine = line.split(' ')
  return {
    count: parseInt(splitLine[1]),
    from: parseInt(splitLine[3]) - 1,
    to: parseInt(splitLine[5]) - 1,
  }
})

// -----------------------------------------------------

// iterate through each direction
// pop off end from "from" stack and then push that to "to" stack

// get the last element from each stack and join them.

let finalTopBoxes = new Array(stacks.length).fill('.')

directions.forEach((direction) => {
  for (let i = 0; i < direction.count; i++) {
    const poppedLetter = stacks[direction.from].pop()
    finalTopBoxes[direction.from] =
      stacks[direction.from][stacks[direction.from].length - 1]
    if (poppedLetter !== undefined) {
      stacks[direction.to].push(poppedLetter)
      finalTopBoxes[direction.to] = poppedLetter
    }
  }
})

console.log(finalTopBoxes.join(''))
