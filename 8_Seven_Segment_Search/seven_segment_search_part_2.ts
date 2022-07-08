import { each, every, find, includes, join, map, split, toNumber } from 'lodash'
import { wireCollections, outputs } from './input'

function runCalculation() {
  let total = 0
  each(wireCollections, (wireCollection, index) => {
    const splitWireCollection = splitString(wireCollection)
    const wireMapping = determineWires(splitWireCollection)
    total = total + calculateOutputs(wireMapping, outputs[index])
  })
  return total
}

function splitString(wireCollection: string) {
  return split(wireCollection, ' ')
}

function determineWires(wireCollection: string[]) {
  let wireMapping = new Map<number, string>()
  wireMapping.set(
    1,
    find(wireCollection, (wire) => wire.length === 2) as string
  )
  wireMapping.set(
    4,
    find(wireCollection, (wire) => wire.length === 4) as string
  )
  wireMapping.set(
    7,
    find(wireCollection, (wire) => wire.length === 3) as string
  )
  wireMapping.set(
    8,
    find(wireCollection, (wire) => wire.length === 7) as string
  )
  wireMapping.set(
    6,
    find(
      wireCollection,
      (wire) =>
        wire.length === 6 &&
        !every(map(wireMapping.get(1), (letter) => includes(wire, letter)))
    ) as string
  )
  wireMapping.set(
    9,
    find(
      wireCollection,
      (wire) =>
        wire.length === 6 &&
        every(
          map(wireMapping.get(4) as string, (letter) => includes(wire, letter))
        )
    ) as string
  )
  wireMapping.set(
    0,
    find(
      wireCollection,
      (wire) =>
        wire.length === 6 &&
        !every(
          map(wire, (letter) => includes(wireMapping.get(6) as string, letter))
        ) &&
        !every(
          map(wire, (letter) => includes(wireMapping.get(9) as string, letter))
        )
    ) as string
  )
  wireMapping.set(
    3,
    find(
      wireCollection,
      (wire) =>
        wire.length === 5 &&
        every(
          map(wireMapping.get(7) as string, (letter) => includes(wire, letter))
        )
    ) as string
  )
  wireMapping.set(
    5,
    find(
      wireCollection,
      (wire) =>
        wire.length === 5 &&
        every(
          map(wire, (letter) => includes(wireMapping.get(6) as string, letter))
        )
    ) as string
  )
  wireMapping.set(
    2,
    find(
      wireCollection,
      (wire) =>
        wire.length === 5 &&
        !every(map(wire, (letter) => includes(wireMapping.get(5), letter))) &&
        !every(map(wire, (letter) => includes(wireMapping.get(3), letter)))
    ) as string
  )
  return wireMapping
}

function calculateOutputs(
  wireMapping: Map<number, string>,
  outputString: string
) {
  const outputCollection = splitString(outputString)
  let total: number[] = []
  each(outputCollection, (outputDigitString) => {
    for (const [key, value] of wireMapping.entries()) {
      if (
        outputDigitString.length === value.length &&
        every(map(outputDigitString, (letter) => includes(value, letter)))
      ) {
        total.push(key)
      }
    }
  })
  return toNumber(join(total, ''))
}

console.log(runCalculation())
