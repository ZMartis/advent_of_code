import { readFileSync } from 'fs'
import {
  differenceBy,
  each,
  filter,
  isNaN,
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

const buses: Bus[] = filter(
  map(input, (bus, index) => {
    return {
      busNumber: toNumber(bus),
      position: index,
      offsetFromLargest: 0,
      latestCheckedTime: 0,
    }
  }),
  (bus) => !isNaN(bus.busNumber)
)

let iterationTime = orderBy(buses, 'busNumber', 'desc')[0].busNumber
let currentTime = iterationTime

const foundBuses: Bus[] = []

function run() {
  while (foundBuses.length < buses.length) {
    console.log(foundBuses.length)
    console.log(currentTime)
    const busesFoundAtCurrentTime = findBusesAtCurrentTime()
    if (busesFoundAtCurrentTime.length > foundBuses.length) {
      const newFoundBus = differenceBy(
        busesFoundAtCurrentTime,
        foundBuses,
        'busNumber'
      )[0]
      foundBuses.push(newFoundBus)
      iterationTime *= newFoundBus.busNumber
    }
    currentTime += iterationTime
  }
  return currentTime + buses[0].offsetFromLargest
}

// --------------

function findBusesAtCurrentTime() {
  return filter(buses, (bus) => {
    return (currentTime + bus.offsetFromLargest) % bus.busNumber === 0
  })
}

console.log(run())
