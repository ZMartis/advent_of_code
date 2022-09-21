import { each, map, split, toNumber } from 'lodash'
import { directionInputs } from './input'

type Vector = {
  direction: string
  distance: number
}

let aim = 0
let hPosition = 0
let dPosition = 0

function parseDirectionInputs(): Vector[] {
  return map(directionInputs, (input) => {
    const splitInput = split(input, ' ')
    return { direction: splitInput[0], distance: toNumber(splitInput[1]) }
  })
}

function calculatePositions() {
  each(parseDirectionInputs(), (vector) => {
    switch (vector.direction) {
      case 'forward':
        hPosition = hPosition + vector.distance
        dPosition = dPosition + aim * vector.distance
        break
      case 'down':
        aim = aim + vector.distance
        break
      case 'up':
        aim = aim - vector.distance
        break
      default:
        break
    }
  })
}

calculatePositions()
console.log(hPosition * dPosition)
