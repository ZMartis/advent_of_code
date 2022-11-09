import { readFileSync } from 'fs'
import {
  differenceBy,
  each,
  filter,
  isNaN,
  map,
  orderBy,
  split,
  subtract,
  toNumber,
} from 'lodash'
import { performance } from 'perf_hooks'

const startTime = performance.now()

type Bus = {
  busNumber: number
  position: number
  offsetFromLargest: number
}

const input: string[] = split(
  split(readFileSync('input.txt', 'utf-8'), '\n')[1],
  ','
)

const buses: Bus[] = filter(
  map(input, (bus, index) => {
    return {
      busNumber: toNumber(bus),
      position: index,
      offsetFromLargest: 0,
    }
  }),
  (bus) => !isNaN(bus.busNumber)
)

const largestBus = orderBy(buses, 'busNumber', 'desc')[0]

function run() {
  setOffsetsFromLargestBus()

  const foundBuses: Bus[] = [orderBy(buses, 'busNumber', 'desc')[0]]
  let iterationTime = largestBus.busNumber
  let currentTime = iterationTime

  while (foundBuses.length < buses.length) {
    currentTime += iterationTime
    const busesFoundAtCurrentTime = findBusesAtCurrentTime(currentTime)

    if (busesFoundAtCurrentTime.length > foundBuses.length) {
      const newFoundBus = differenceBy(
        busesFoundAtCurrentTime,
        foundBuses,
        'busNumber'
      )[0]
      foundBuses.push(newFoundBus)
      iterationTime *= newFoundBus.busNumber
    }
  }
  return currentTime + buses[0].offsetFromLargest
}

// --------------

function setOffsetsFromLargestBus() {
  each(buses, (bus, index) => {
    buses[index].offsetFromLargest = subtract(bus.position, largestBus.position)
  })
}

function findBusesAtCurrentTime(currentTime: number) {
  return filter(buses, (bus) => {
    return (currentTime + bus.offsetFromLargest) % bus.busNumber === 0
  })
}

// --------------

console.log(run())

const endTime = performance.now()

console.log(`${endTime - startTime}ms`)
