import { readFileSync } from 'fs'
import { cloneDeep, map, split, toNumber } from 'lodash'

const input = map(split(readFileSync('input.txt', 'utf-8'), ','), (string) =>
  toNumber(string)
)

const targetOutput = 19690720
let noun: number = 0
let verb: number = 0

for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    const copiedInput = cloneDeep(input)
    copiedInput.splice(1, 2, i, j)
    if (runComputer(copiedInput)) {
      noun = copiedInput[1]
      verb = copiedInput[2]
    }
  }
}

function runComputer(numberList: number[]) {
  for (let i = 0; i < numberList.length && numberList[i] !== 99; i += 4) {
    const value1 = numberList[numberList[i + 1]]
    const value2 = numberList[numberList[i + 2]]
    const outputPos = numberList[i + 3]

    if (numberList[i] === 1) {
      numberList.splice(outputPos, 1, value1 + value2)
    } else if (numberList[i] === 2) {
      numberList.splice(outputPos, 1, value1 * value2)
    }
  }
  return numberList[0] === targetOutput
}

console.log(100 * noun + verb)
