import { readFileSync } from 'fs'
import { filter, includes, map, split, toNumber } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), '\n'), (string) =>
  toNumber(string)
)

const finalNumbers = filter(input, (number) => includes(input, 2020 - number))

console.log(finalNumbers[0] * finalNumbers[1])
