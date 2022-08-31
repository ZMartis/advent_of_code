import { readFileSync } from 'fs'
import { map, split } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), '\n'), (line) =>
  split(line, '')
)

const gridWidth = input[0].length
const gridHeight = input.length
const over = 3
const down = 1

let trees = 0


