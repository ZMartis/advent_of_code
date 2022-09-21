import { each, filter, max, min } from 'lodash'
import { lines } from './input'

type Line = {
  start: [number, number]
  end: [number, number]
}

let mappedPoints = new Map<string, number>()

function mapLines() {
  each(lines, (line) => {
    const distance = calculateDistance(line)
    for (let i = 0; i < distance; i++) {
      const coordinates = calculateCoordinates(line, i)
      if (mappedPoints.get(coordinates)) {
        const coordinateValue = mappedPoints.get(coordinates) as number
        mappedPoints.set(coordinates, coordinateValue + 1)
      } else {
        mappedPoints.set(coordinates, 1)
      }
    }
  })
}

function calculateDistance(line: Line) {
  let largestNumber: number
  let smallestNumber: number
  if (line.start[0] !== line.end[0]) {
    largestNumber = max([line.start[0], line.end[0]]) as number
    smallestNumber = min([line.start[0], line.end[0]]) as number
  } else {
    largestNumber = max([line.start[1], line.end[1]]) as number
    smallestNumber = min([line.start[1], line.end[1]]) as number
  }
  return largestNumber - smallestNumber + 1
}

function calculateCoordinates(line: Line, iteration: number) {
  if (line.start[1] === line.end[1] && line.start[0] < line.end[0]) {
    // Horizontal lines forward
    return convertCoordinatesToString(line.start[0] + iteration, line.start[1])
  } else if (line.start[1] === line.end[1] && line.start[0] > line.end[0]) {
    // Horizontal lines backward
    return convertCoordinatesToString(line.start[0] - iteration, line.start[1])
  } else if (line.start[0] === line.end[0] && line.start[1] < line.end[1]) {
    // Vertical lines up
    return convertCoordinatesToString(line.start[0], line.start[1] + iteration)
  } else if (line.start[0] === line.end[0] && line.start[1] > line.end[1]) {
    // Vertical lines down
    return convertCoordinatesToString(line.start[0], line.start[1] - iteration)
  } else if (line.start[0] < line.end[0] && line.start[1] < line.end[1]) {
    // Diagonal lines up forward
    return convertCoordinatesToString(
      line.start[0] + iteration,
      line.start[1] + iteration
    )
  } else if (line.start[0] > line.end[0] && line.start[1] > line.end[1]) {
    // Diagonal lines up backward
    return convertCoordinatesToString(
      line.end[0] + iteration,
      line.end[1] + iteration
    )
  } else if (line.start[0] < line.end[0] && line.start[1] > line.end[1]) {
    // Diagonal lines down forward
    return convertCoordinatesToString(
      line.start[0] + iteration,
      line.start[1] - iteration
    )
  } else {
    // Diagonal lines down backward
    return convertCoordinatesToString(
      line.end[0] + iteration,
      line.end[1] - iteration
    )
  }
}

function convertCoordinatesToString(x: number, y: number) {
  return `${x},${y}`
}

mapLines()
console.log(filter([...mappedPoints], ([_key, value]) => value > 1).length)
