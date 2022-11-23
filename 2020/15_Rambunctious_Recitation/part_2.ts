import { readFileSync } from 'fs'
import { each, map, split, toNumber } from 'lodash'

const startingNumbers = map(
  split(readFileSync('input.txt', 'utf-8'), ','),
  (stringNumber) => toNumber(stringNumber)
)

// Main Code --------------------

function run(gameLength: number) {
  const spokenNumberMapping = new Map<number, number>()
  each(startingNumbers, (number, index) => {
    spokenNumberMapping.set(number, index + 1)
  })
  let latestSpokenNumber = 0
  for (let i = startingNumbers.length + 1; i < gameLength; i++) {
    const previousIndex = spokenNumberMapping.get(latestSpokenNumber)
    spokenNumberMapping.set(latestSpokenNumber, i)
    previousIndex === undefined
      ? (latestSpokenNumber = 0)
      : (latestSpokenNumber = i - previousIndex)
  }
  return latestSpokenNumber
}

console.log(run(30000000))
