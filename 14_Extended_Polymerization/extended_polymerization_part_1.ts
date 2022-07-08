import { readFileSync } from 'fs'
import { each, join, map, orderBy, split } from 'lodash'

const data: string[] = split(readFileSync('input.txt', 'utf-8'), '\n\n')

// -------------------------------------------

let polymer: string = data[0]
const dictionary: Map<string, string> = new Map()

function setDictionary() {
  each(split(data[1], '\n'), (line) => {
    const definition = split(line, ' -> ')
    dictionary.set(definition[0], definition[1])
  })
}

function advanceStep() {
  const pairingToCheck: string[] = map(
    new Array(2).fill(null),
    (_number, index) => polymer[index]
  )
  const newPolymer: string[] = []

  let i = 2
  while (i <= polymer.length) {
    newPolymer.push(pairingToCheck[0])
    // check pairing
    const definition = dictionary.get(join(pairingToCheck, ''))
    if (definition !== undefined) {
      newPolymer.push(definition)
    }
    // slide check array
    pairingToCheck.shift()
    pairingToCheck.push(polymer[i])
    i++
  }
  newPolymer.push(polymer[polymer.length - 1])
  polymer = join(newPolymer, '')
}

function calculateAnswer() {
  const letterMapping: Map<string, number> = new Map()
  each(split(polymer, ''), (letter) => {
    const mappingForLetter = letterMapping.get(letter)
    if (mappingForLetter === undefined) {
      letterMapping.set(letter, 1)
    } else {
      letterMapping.set(letter, mappingForLetter + 1)
    }
  })
  const orderedByFrequency = orderBy(
    [...letterMapping],
    (letterPair) => -letterPair[1]
  )
  return (
    orderedByFrequency[0][1] -
    orderedByFrequency[orderedByFrequency.length - 1][1]
  )
}

setDictionary()
let i = 0
while (i < 10) {
  advanceStep()
  i++
}

console.log(calculateAnswer())
