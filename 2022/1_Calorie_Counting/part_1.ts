import { readFileSync } from 'fs'

const input: number[][] = readFileSync('input.txt', 'utf-8')
  .split('\n\n')
  .map((elfPack) => elfPack.split('\n').map((candyBar) => parseInt(candyBar)))

// --------------

const bagsWithTotalCallories = input.map((bag) =>
  bag.reduce((sum, number) => sum + number)
)

const bagWithMostCallories = bagsWithTotalCallories.sort((a, b) => b - a)[0]

console.log(bagWithMostCallories)
