import { readFileSync } from 'fs'
import { filter, map, sortBy, split, toNumber } from 'lodash'

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

const arrivalTime = toNumber(input[0])
const runningBuses = map(
  filter(split(input[1], ','), (bus) => bus !== 'x'),
  (bus) => toNumber(bus)
)

const nextBus = sortBy(
  map(runningBuses, (bus) => {
    const remainder = arrivalTime % bus
    return {
      time: arrivalTime - remainder + bus,
      bus,
    }
  }),
  'time'
)[0]

console.log((nextBus.time - arrivalTime) * nextBus.bus)
