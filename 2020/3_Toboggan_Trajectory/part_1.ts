import { readFileSync } from 'fs'
import { each, map, split } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), '\n'), (row) =>
  split(row, '')
) as ('.' | '#')[][]

const xMovement = 3
let currentX = 0
let treeTally = 0

each(input, (row) => {
  if (row[currentX] == '#') {
    treeTally++
  }
  currentX += xMovement
  if (currentX > input[0].length - 1) {
    currentX -= input[0].length
  }
})

console.log(treeTally)
