import { readFileSync } from 'fs'
import { camelCase, each, every, flatten, map, split, toNumber } from 'lodash'

interface Rules {
  [key: string]: RangeObject
}

interface RangeObject {
  lowMin: number
  lowMax: number
  highMin: number
  highMax: number
}

const input = split(readFileSync('input.txt', 'utf-8'), '\n\n')

let rules: Rules = {}
each(split(input[0], '\n'), (line) => {
  const splitLine = split(line, ': ')
  const ranges = split(splitLine[1], ' or ')
  const lowRange = split(ranges[0], '-')
  const highRange = split(ranges[1], '-')
  rules[camelCase(splitLine[0])] = {
    lowMin: toNumber(lowRange[0]),
    lowMax: toNumber(lowRange[1]),
    highMin: toNumber(highRange[0]),
    highMax: toNumber(highRange[1]),
  }
})
const nearbyTickets = map(split(split(input[2], ':\n')[1], '\n'), (line) =>
  map(split(line, ','), (string) => toNumber(string))
)

// ---------------------------

function run() {
  const invalidSet = new Set<number>()
  let total = 0
  each(flatten(nearbyTickets), (number) => {
    if (invalidSet.has(number)) {
      total += number
    } else if (numberIsInvalid(number)) {
      invalidSet.add(number)
      total += number
    }
  })
  return total
}

function numberIsInvalid(number: number) {
  const keys = Object.keys(rules)
  return every(
    map(
      keys,
      (key) =>
        !(number >= rules[key].lowMin && number <= rules[key].lowMax) &&
        !(number >= rules[key].highMin && number <= rules[key].highMax)
    )
  )
}

console.log(run())
