import { readFileSync } from 'fs'
import { each, map, split, subtract, toNumber } from 'lodash'

type Direction = 'N' | 'S' | 'E' | 'W' | 'F' | 'L' | 'R'

const allInputs: [Direction, number][] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (string) => [string[0] as Direction, toNumber(string.substring(1))]
)

const shipLocation = {
  x: 0,
  y: 0,
}

const waypointLocation = {
  x: 10,
  y: 1,
}

function run() {
  each(allInputs, ([direction, value]) => {
    if (direction === 'L' || direction === 'R') {
      rotateWaypoint(direction, value)
    } else if (direction === 'F') {
      forwardMovement(value)
    } else {
      moveWaypoint(direction, value)
    }
  })
  return Math.abs(shipLocation.x) + Math.abs(shipLocation.y)
}

function rotateWaypoint(direction: 'L' | 'R', value: number) {
  const xyDistance = getXYDistance()
  if (value === 180) {
    waypointLocation.x += xyDistance.x * -2
    waypointLocation.y += xyDistance.y * -2
  } else if (
    (direction === 'L' && value === 90) ||
    (direction === 'R' && value === 270)
  ) {
    waypointLocation.x = shipLocation.x + xyDistance.y * -1
    waypointLocation.y = shipLocation.y + xyDistance.x
  } else {
    waypointLocation.x = shipLocation.x + xyDistance.y
    waypointLocation.y = shipLocation.y + xyDistance.x * -1
  }
}

function forwardMovement(value: number) {
  const xyDistance = getXYDistance()
  shipLocation.x += xyDistance.x * value
  shipLocation.y += xyDistance.y * value
  waypointLocation.x += xyDistance.x * value
  waypointLocation.y += xyDistance.y * value
}

function getXYDistance() {
  return {
    x: subtract(waypointLocation.x, shipLocation.x),
    y: subtract(waypointLocation.y, shipLocation.y),
  }
}

function moveWaypoint(direction: 'N' | 'S' | 'E' | 'W', value: number) {
  if (direction === 'N') {
    waypointLocation.y += value
  } else if (direction === 'S') {
    waypointLocation.y -= value
  } else if (direction === 'E') {
    waypointLocation.x += value
  } else if (direction === 'W') {
    waypointLocation.x -= value
  }
}

console.log(run())
