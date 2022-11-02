import { readFileSync } from 'fs'
import { each, map, split, toNumber } from 'lodash'

type Direction = 'N' | 'S' | 'E' | 'W' | 'F' | 'L' | 'R'

const allInputs: [Direction, number][] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (string) => [string[0] as Direction, toNumber(string.substring(1))]
)

const location = {
  x: 0,
  y: 0,
}

let currentDirection: Direction = 'E'

function run() {
  each(allInputs, ([direction, value]) => {
    let movingDirection = direction

    if (direction === 'L' || direction === 'R') {
      rotateShip(direction, value)
    } else if (direction === 'F') {
      movingDirection = currentDirection
    }

    if (direction !== 'L' && direction !== 'R') {
      moveShip(movingDirection, value)
    }
  })

  return Math.abs(location.x) + Math.abs(location.y)
}

function rotateShip(direction: 'L' | 'R', value: number) {
  switch (currentDirection) {
    case 'N':
      if (direction === 'L') {
        switch (value) {
          case 90:
            currentDirection = 'W'
            break
          case 180:
            currentDirection = 'S'
            break
          case 270:
            currentDirection = 'E'
            break
          default:
            break
        }
      } else {
        switch (value) {
          case 90:
            currentDirection = 'E'
            break
          case 180:
            currentDirection = 'S'
            break
          case 270:
            currentDirection = 'W'
            break
          default:
            break
        }
      }
      break
    case 'S':
      if (direction === 'L') {
        switch (value) {
          case 90:
            currentDirection = 'E'
            break
          case 180:
            currentDirection = 'N'
            break
          case 270:
            currentDirection = 'W'
            break
          default:
            break
        }
      } else {
        switch (value) {
          case 90:
            currentDirection = 'W'
            break
          case 180:
            currentDirection = 'N'
            break
          case 270:
            currentDirection = 'E'
            break
          default:
            break
        }
      }
      break
    case 'E':
      if (direction === 'L') {
        switch (value) {
          case 90:
            currentDirection = 'N'
            break
          case 180:
            currentDirection = 'W'
            break
          case 270:
            currentDirection = 'S'
            break
          default:
            break
        }
      } else {
        switch (value) {
          case 90:
            currentDirection = 'S'
            break
          case 180:
            currentDirection = 'W'
            break
          case 270:
            currentDirection = 'N'
            break
          default:
            break
        }
      }
      break
    case 'W':
      if (direction === 'L') {
        switch (value) {
          case 90:
            currentDirection = 'S'
            break
          case 180:
            currentDirection = 'E'
            break
          case 270:
            currentDirection = 'N'
            break
          default:
            break
        }
      } else {
        switch (value) {
          case 90:
            currentDirection = 'N'
            break
          case 180:
            currentDirection = 'E'
            break
          case 270:
            currentDirection = 'S'
            break
          default:
            break
        }
      }
      break
    default:
      break
  }
}

function moveShip(movingDirection: Direction, value: number) {
  switch (movingDirection) {
    case 'N':
      location.y += value
      break
    case 'S':
      location.y -= value
      break
    case 'E':
      location.x += value
      break
    case 'W':
      location.x -= value
      break
    default:
      break
  }
}

console.log(run())
