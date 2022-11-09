import { readFileSync } from 'fs'
import {
  differenceBy,
  each,
  filter,
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
  split(readFileSync('input.txt', 'utf-8'), '\n')[1],
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

each(buses, (bus, index) => {
  buses[index].offsetFromLargest = subtract(bus.position, largestBus.position)
})

const primeBuses = filter(
  buses,
  (bus) =>
    bus.busNumber === Math.abs(bus.offsetFromLargest) ||
    bus.offsetFromLargest === 0
)

let alreadyFoundBuses = primeBuses

let iterationTime = reduce(primeBuses, (mult, bus) => mult * bus.busNumber, 1)
let currentTime = iterationTime

function run() {
  while (alreadyFoundBuses.length < buses.length) {
    if (busesFound().length > alreadyFoundBuses.length) {
      // find changes index
      const newFonudBus = differenceBy(
        busesFound(),
        alreadyFoundBuses,
        'busNumber'
      )[0]
      alreadyFoundBuses.push(newFonudBus)
      iterationTime *= newFonudBus.busNumber
    }
    currentTime += iterationTime
  }
  return buses[0].latestCheckedTime
}

function busesFound() {
  return filter(buses, (bus, index) => {
    const timeToCheck = currentTime + bus.offsetFromLargest
    buses[index].latestCheckedTime = timeToCheck
    return timeToCheck % bus.busNumber === 0
  })
}

console.log(run())
