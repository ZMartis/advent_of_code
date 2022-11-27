import { readFileSync } from 'fs'
import {
  each,
  indexOf,
  intersection,
  map,
  sortBy,
  split,
  toNumber,
} from 'lodash'

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

interface Instruction {
  direction: 'U' | 'R' | 'D' | 'L'
  value: number
}

// -----------------------------------------

const wire1Instructions: Instruction[] = map(
  split(input[0], ','),
  (instruction) => {
    return {
      direction: instruction[0] as Instruction['direction'],
      value: toNumber(instruction.slice(1)),
    }
  }
)
const wire2Instructions: Instruction[] = map(
  split(input[1], ','),
  (instruction) => {
    return {
      direction: instruction[0] as Instruction['direction'],
      value: toNumber(instruction.slice(1)),
    }
  }
)

function run() {
  const wire1Points = plotPointsForWire(wire1Instructions)
  const wire2Points = plotPointsForWire(wire2Instructions)

  const crossedPoints = intersection(wire1Points, wire2Points)

  const wire1CrossedIndexes = map(
    crossedPoints,
    (point) => indexOf(wire1Points, point) + 1
  )
  const wire2CrossedIndexes = map(
    crossedPoints,
    (point) => indexOf(wire2Points, point) + 1
  )

  const totalStepsForCrosses = map(
    wire1CrossedIndexes,
    (value, index) => value + wire2CrossedIndexes[index]
  )

  return sortBy(totalStepsForCrosses)[0]
}

function plotPointsForWire(instructionList: Instruction[]) {
  const wirePoints: string[] = []
  let currentPos = [0, 0]
  each(instructionList, (instruction) => {
    let newPosition: [number, number]
    switch (instruction.direction) {
      case 'D':
        newPosition = [currentPos[0], currentPos[1] - instruction.value]
        for (let i = currentPos[1] - 1; i >= newPosition[1]; i--) {
          wirePoints.push(`${currentPos[0]},${i}`)
        }
        currentPos = newPosition
        break
      case 'L':
        newPosition = [currentPos[0] - instruction.value, currentPos[1]]
        for (let i = currentPos[0] - 1; i >= newPosition[0]; i--) {
          wirePoints.push(`${i},${currentPos[1]}`)
        }
        currentPos = newPosition
        break
      case 'R':
        newPosition = [currentPos[0] + instruction.value, currentPos[1]]
        for (let i = currentPos[0] + 1; i <= newPosition[0]; i++) {
          wirePoints.push(`${i},${currentPos[1]}`)
        }
        currentPos = newPosition
        break
      case 'U':
        newPosition = [currentPos[0], currentPos[1] + instruction.value]
        for (let i = currentPos[1] + 1; i <= newPosition[1]; i++) {
          wirePoints.push(`${currentPos[0]},${i}`)
        }
        currentPos = newPosition
      default:
        break
    }
  })
  return wirePoints
}

console.log(run())
