import { readFileSync } from 'fs'

const input: number[][] = readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map((elfPack) => elfPack.split('\n').map((candyBar) => parseInt(candyBar)))

// --------------

const bagsWithTotalCallories = input.map((bag) =>
  bag.reduce((sum, number) => sum + number)
)

const sortedBags = bagsWithTotalCallories.sort((a, b) => b - a)

function sumOfTopBags(numberOfBags: number) {
  let sumOfBags = 0
  for (let i = 0; i < numberOfBags; i++) {
    sumOfBags += sortedBags[i]
  }
  return sumOfBags
}

console.log(sumOfTopBags(3))
