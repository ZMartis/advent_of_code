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

let finalTopBoxes = new Array(stacks.length).fill('.')

directions.forEach((direction) => {
  const poppedLetters = stacks[direction.from].splice(
    stacks[direction.from].length - direction.count,
    direction.count
  )
  finalTopBoxes[direction.from] =
    stacks[direction.from][stacks[direction.from].length - 1]
  if (poppedLetters.length > 0) {
    stacks[direction.to].push(...poppedLetters)
    finalTopBoxes[direction.to] = poppedLetters[poppedLetters.length - 1]
  }
})

console.log(finalTopBoxes.join(''))
