import { readFileSync } from 'fs'
import { split } from 'lodash'

const input = split(readFileSync('input.txt', 'utf-8'), '\n\n')

console.log(input)
