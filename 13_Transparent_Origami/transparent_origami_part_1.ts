import { readFileSync } from 'fs'
import { filter, map, split, toInteger, uniq } from 'lodash'

const data = split(readFileSync('input.txt', 'utf-8'), '\n\n')

// ---------------------------------------------

const points = map(split(data[0], '\n'), (point) =>
  map(split(point, ','), (number) => toInteger(number))
)
const directions = map(split(data[1], '\n'), (direction) => {
  const splitString = split(direction, '=')
  return {
    direction: splitString[0],
    position: toInteger(splitString[1]),
  }
})
const removedFoldLine = filter(
  points,
  (point) => point[0] !== directions[0].position
)
const newPoints = map(removedFoldLine, (point) => {
  if (point[0] > directions[0].position) {
    const newValue =
      directions[0].position - (point[0] - directions[0].position)
    return `${newValue},${point[1]}`
  } else {
    return `${point[0]},${point[1]}`
  }
})

console.log(uniq(newPoints).length)
