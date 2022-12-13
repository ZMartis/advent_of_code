import { readFileSync } from 'fs'

const input: Range[][] = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) =>
    line.split(',').map((pair) => {
      const stringPairs = pair.split('-')
      return {
        min: parseInt(stringPairs[0]),
        max: parseInt(stringPairs[1]),
      }
    })
  )

type Range = {
  min: number
  max: number
}

let counter = 0
// iterate over each pairings
// check if they overlap
// if they are then increment counter

input.forEach((pairing) => {
  if (pairingsOverlap(pairing)) {
    counter++
  }
})

function pairingsOverlap(pairing: Range[]): boolean {
  return (
    (pairing[0].min >= pairing[1].min && pairing[0].min <= pairing[1].max) ||
    (pairing[0].max >= pairing[1].min && pairing[0].max <= pairing[1].max) ||
    (pairing[1].min >= pairing[0].min && pairing[1].min <= pairing[0].max) ||
    (pairing[1].max >= pairing[0].min && pairing[1].max <= pairing[0].max)
  )
}

console.log(counter)
