import { readFileSync } from 'fs'
import { includes, map, split, toNumber } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), '\n'), (string) =>
  toNumber(string)
)

let numberFound = false
for (const mainNumber of input) {
  if (numberFound === true) {
    break
  }
  for (const number of input) {
    if (includes(input, 2020 - mainNumber - number)) {
      console.log(mainNumber * number * (2020 - mainNumber - number))
      numberFound = true
      break
    }
  }
}
