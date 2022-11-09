import { readFileSync } from 'fs'
import { each, every, map, orderBy, split, subtract, toNumber } from 'lodash'

type Bus = {
  busNumber: number
  position: number
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
      latestCheckedTime: 0,
    })
  }
})
const largestBus = orderBy(buses, 'busNumber', 'desc')[0]

function run() {
  // set time to check agaist
  // check all other numbers if they have 0 remainerd at their index relative to time
  let iteratedTime = 100000000000000 - (100000000000000 % largestBus.busNumber)
  let locationFound = false

  while (locationFound === false) {
    checkBuses(iteratedTime)
      ? (locationFound = true)
      : (iteratedTime += largestBus.busNumber)
    console.log(
      map(buses, (bus, index) => {
        const timeToCheck =
          iteratedTime + subtract(bus.position, largestBus.position)

        buses[index].latestCheckedTime = timeToCheck
        return timeToCheck % bus.busNumber === 0
      })
    )
    console.log(buses)
  }
  return buses
}

function checkBuses(iteratedTime: number) {
  return every(
    map(buses, (bus, index) => {
      const timeToCheck =
        iteratedTime + subtract(bus.position, largestBus.position)

      buses[index].latestCheckedTime = timeToCheck
      return timeToCheck % bus.busNumber === 0
    })
  )
}

console.log(run())
