import { each, filter, max, min } from 'lodash'
import { lines } from './input'

type Line = {
  start: [number, number]
  end: [number, number]
}

let mappedPoints = new Map<string, number>()

const horizontalLines: Line[] = filter(
  lines,
  (line) => line.start[1] === line.end[1]
)
const verticalLines: Line[] = filter(
  lines,
  (line) => line.start[0] === line.end[0]
)

function mapHorizontalPoints() {
  each(horizontalLines, (line) => {
    const largestNumber = max([line.start[0], line.end[0]]) as number
    const smallestNumber = min([line.start[0], line.end[0]]) as number

    for (let i = smallestNumber; i <= largestNumber; i++) {
      const coordinates = convertCoordinatesToString(i, line.start[1])
      if (mappedPoints.get(coordinates)) {
        const coordinateValue = mappedPoints.get(coordinates) as number
        mappedPoints.set(coordinates, coordinateValue + 1)
      } else {
        mappedPoints.set(coordinates, 1)
      }
    }
  })
}

function mapVerticalPoints() {
  each(verticalLines, (line) => {
    const largestNumber = max([line.start[1], line.end[1]]) as number
    const smallestNumber = min([line.start[1], line.end[1]]) as number

    for (let i = smallestNumber; i <= largestNumber; i++) {
      const coordinates = convertCoordinatesToString(line.start[0], i)
      if (mappedPoints.get(coordinates)) {
        const coordinateValue = mappedPoints.get(coordinates) as number
        mappedPoints.set(coordinates, coordinateValue + 1)
      } else {
        mappedPoints.set(coordinates, 1)
      }
    }
  })
}

function convertCoordinatesToString(x: number, y: number) {
  return `${x},${y}`
}

mapHorizontalPoints()
mapVerticalPoints()
console.log(filter([...mappedPoints], ([_key, value]) => value > 1).length)
