import { readFileSync } from 'fs'
import { map, reduce, split } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), '\n'), (row) =>
  split(row, '')
) as ('.' | '#')[][]

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

function treesForAllSlopes() {
  return map(slopes, (slope) => countTreesOnSlope(slope[0], slope[1]))
}

function countTreesOnSlope(xMovement: number, yMovement: number) {
  let currentX = 0
  let treeTally = 0
  for (let i = 0; i < input.length; i = i + yMovement) {
    if (input[i][currentX] == '#') {
      treeTally++
    }
    currentX += xMovement
    if (currentX > input[0].length - 1) {
      currentX -= input[0].length
    }
  }
  return treeTally
}

console.log(
  reduce(treesForAllSlopes(), (product, number) => product * number, 1)
)
