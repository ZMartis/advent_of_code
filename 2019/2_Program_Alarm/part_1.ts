import { readFileSync } from 'fs'
import { map, split, toNumber } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), ','), (string) =>
  toNumber(string)
)

input.splice(1, 2, 12, 2)

for (let i = 0; i < input.length && input[i] !== 99; i += 4) {
  const value1 = input[input[i + 1]]
  const value2 = input[input[i + 2]]
  const outputPos = input[i + 3]

  if (input[i] === 1) {
    input.splice(outputPos, 1, value1 + value2)
  } else if (input[i] === 2) {
    input.splice(outputPos, 1, value1 * value2)
  }
}

console.log(input[0])
