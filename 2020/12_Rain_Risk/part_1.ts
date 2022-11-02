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
      console.log(movingDirection)
      moveShip(movingDirection, value)
    }
  })

  return Math.abs(location.x) + Math.abs(location.y)
}

function rotateShip(direction: 'L' | 'R', value: number) {
  switch (currentDirection) {
    case 'N':
      if (direction === 'L') {
        if (value === 90) {
          currentDirection = 'W'
        } else if (value === 180) {
          currentDirection = 'S'
        } else {
          currentDirection = 'E'
        }
      } else {
        if (value === 90) {
          currentDirection = 'E'
        } else if (value === 180) {
          currentDirection = 'S'
        } else {
          currentDirection = 'W'
        }
      }
      break
    case 'S':
      if (direction === 'L') {
        if (value === 90) {
          currentDirection = 'E'
        } else if (value === 180) {
          currentDirection = 'N'
        } else {
          currentDirection = 'W'
        }
      } else {
        if (value === 90) {
          currentDirection = 'W'
        } else if (value === 180) {
          currentDirection = 'N'
        } else {
          currentDirection = 'E'
        }
      }
      break
    case 'E':
      if (direction === 'L') {
        if (value === 90) {
          currentDirection = 'N'
        } else if (value === 180) {
          currentDirection = 'W'
        } else {
          currentDirection = 'S'
        }
      } else {
        if (value === 90) {
          currentDirection = 'S'
        } else if (value === 180) {
          currentDirection = 'W'
        } else {
          currentDirection = 'N'
        }
      }
      break
    case 'W':
      if (direction === 'L') {
        if (value === 90) {
          currentDirection = 'S'
        } else if (value === 180) {
          currentDirection = 'E'
        } else {
          currentDirection = 'N'
        }
      } else {
        if (value === 90) {
          currentDirection = 'N'
        } else if (value === 180) {
          currentDirection = 'E'
        } else {
          currentDirection = 'S'
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
