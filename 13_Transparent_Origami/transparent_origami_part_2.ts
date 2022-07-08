import { readFileSync } from 'fs'
import { each, join, map, orderBy, split, toInteger, uniq } from 'lodash'

type Direction = {
  orientation: 'x' | 'y'
  position: number
}

const data = split(readFileSync('input.txt', 'utf-8'), '\n\n')

// -------------------------------------------------------

let points = split(data[0], '\n')

const directions: Direction[] = map(split(data[1], '\n'), (direction) => {
  const splitString = split(direction, '=')
  return {
    orientation: splitString[0] as 'x' | 'y',
    position: toInteger(splitString[1]),
  }
})

function foldTransparencies() {
  each(directions, (direction) => {
    points = uniq(
      map(points, (point) => {
        if (
          pointAsNumbers(point)[direction.orientation === 'x' ? 0 : 1] >
          direction.position
        ) {
          const newValue =
            2 * direction.position -
            pointAsNumbers(point)[direction.orientation === 'x' ? 0 : 1]
          return direction.orientation === 'x'
            ? pointAsString([newValue, pointAsNumbers(point)[1]])
            : pointAsString([pointAsNumbers(point)[0], newValue])
        } else {
          return point
        }
      })
    )
  })
}

function plotFinalImage() {
  const maxX: number = pointAsNumbers(
    orderBy(points, (point) => -pointAsNumbers(point)[0])[0]
  )[0]
  const maxY: number = pointAsNumbers(
    orderBy(points, (point) => -pointAsNumbers(point)[1])[0]
  )[1]
  let display: string[][] = map(Array(maxY + 1).fill(null), () =>
    Array(maxX + 1).fill(' ')
  )
  each(points, (point) => {
    const numberPoint = pointAsNumbers(point)
    display[numberPoint[1]][numberPoint[0]] = '#'
  })
  return map(display, (line) => join(line, ' '))
}

// Helper functions
function pointAsNumbers(point: string) {
  return map(split(point, ','), (pointValue) => toInteger(pointValue))
}
function pointAsString(point: number[]) {
  return `${point[0]},${point[1]}`
}

foldTransparencies()
console.log(plotFinalImage())
