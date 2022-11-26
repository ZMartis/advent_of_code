import { readFileSync } from 'fs'
import { floor, map, split, sum, toNumber } from 'lodash'

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

console.log(sum(map(input, (number) => floor(toNumber(number) / 3) - 2)))
