import { readFileSync } from 'fs'
import {
  differenceBy,
  each,
  every,
  filter,
  map,
  orderBy,
  reduce,
  split,
  subtract,
  toNumber,
} from 'lodash'

type Bus = {
  busNumber: number
  position: number
  offsetFromLargest: number
  latestCheckedTime: number
}
const input: string[] = split(
  split(readFileSync('smallInput.txt', 'utf-8'), '\n')[1],
  ','
)

const buses: Bus[] = []
each(input, (bus, index) => {
  if (bus !== 'x') {
    buses.push({
      busNumber: toNumber(bus),
      position: index,
      offsetFromLargest: 0,
      latestCheckedTime: 0,
    })
  }
})
const largestBus = orderBy(buses, 'busNumber', 'desc')[0]
const smallestOffsetBus = orderBy(buses, 'offsetFromLargest', 'asc')[0]

each(buses, (bus, index) => {
  buses[index].offsetFromLargest = subtract(bus.position, largestBus.position)
})

const primeBuses = filter(
  buses,
  (bus) =>
    bus.busNumber === Math.abs(bus.offsetFromLargest) ||
    bus.offsetFromLargest === 0
)

const iterationTime = reduce(primeBuses, (mult, bus) => mult * bus.busNumber, 1)

let currentTime = iterationTime

function run() {
  while (!positionFound()) {
    currentIterationTime += iterationTime
  }
}

function positionFound(): boolean {
  const positionsFound = map(buses, (bus) => {
    const timeToCheck = currentIterationTime + bus.offsetFromLargest
    return timeToCheck % bus.busNumber === 0
  })

  return every(positionsFound)
}

// when new bus is true multiply the iteration Time by the bus number

run()
console.log(buses)
