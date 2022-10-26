import { readFileSync } from 'fs'
import { map, sortBy, split, toNumber } from 'lodash'

const sortedList = sortBy(
  map(split(readFileSync('input.txt', 'utf-8'), '\n'), (stringNumber) =>
    toNumber(stringNumber)
  )
)

sortedList.unshift(0)
sortedList.push(sortedList[sortedList.length - 1] + 3)

const mapping = {
  1: 0,
  2: 0,
  3: 0,
}

for (let i = 1; i < sortedList.length; i++) {
  const difference = (sortedList[i] - sortedList[i - 1]) as 1 | 2 | 3
  mapping[difference]++
}

console.log(mapping[1] * mapping[3])
