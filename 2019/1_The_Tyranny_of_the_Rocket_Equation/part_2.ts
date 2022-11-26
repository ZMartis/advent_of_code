import { readFileSync } from 'fs'
import { floor, map, split, sum, toNumber } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), '\n'), (string) =>
  toNumber(string)
)

const fuelForEachModule = map(input, (moduleWeight) => {
  return recursivlyFindFuel(moduleWeight)
})

function recursivlyFindFuel(moduleWeight: number) {
  let fuel = floor(moduleWeight / 3) - 2
  let addedFuel: number
  if (fuel > 0) {
    addedFuel = recursivlyFindFuel(fuel)
  } else {
    addedFuel = 0
    fuel = 0
  }
  return fuel + addedFuel
}

console.log(sum(fuelForEachModule))
