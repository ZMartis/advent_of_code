import { readFileSync } from 'fs'
import { each, orderBy, split } from 'lodash'

const data: string[] = split(readFileSync('input.txt', 'utf-8'), '\n\n')

// -------------------------------------------

const letterTally: Map<string, number> = new Map()
function setInitialLetterTally() {
  each(split(data[0], ''), (letter) => {
    const letterMapping = letterTally.get(letter)
    if (letterMapping === undefined) {
      letterTally.set(letter, 1)
    } else {
      letterTally.set(letter, letterMapping + 1)
    }
  })
}

let pairMapping: Map<string, number> = new Map()
function setPairMapping() {
  const initialPolymerArray = split(data[0], '')
  let i = 0
  while (i < initialPolymerArray.length - 1) {
    const pairing = `${initialPolymerArray[i]}${initialPolymerArray[i + 1]}`
    const pairMapped = pairMapping.get(pairing)
    if (pairMapped === undefined) {
      pairMapping.set(pairing, 1)
    } else {
      pairMapping.set(pairing, pairMapped + 1)
    }
    i++
  }
}

const dictionary: Map<string, string> = new Map()
function setDictionary() {
  each(split(data[1], '\n'), (line) => {
    const definition = split(line, ' -> ')
    dictionary.set(definition[0], definition[1])
  })
}

function advanceStep() {
  const newPairs: Map<string, number> = new Map()
  each([...pairMapping], ([pair, quantity]) => {
    // check pair
    const newLetter = dictionary.get(pair)
    if (newLetter !== undefined) {
      // add result to tally
      const letterMapping = letterTally.get(newLetter)
      if (letterMapping === undefined) {
        letterTally.set(newLetter, quantity)
      } else {
        letterTally.set(newLetter, letterMapping + quantity)
      }
      // add new pair to newPairs
      const firstNewPair = newPairs.get(`${pair[0]}${newLetter}`)
      const secondNewPair = newPairs.get(`${newLetter}${pair[1]}`)
      if (firstNewPair === undefined) {
        newPairs.set(`${pair[0]}${newLetter}`, quantity)
      } else {
        newPairs.set(`${pair[0]}${newLetter}`, firstNewPair + quantity)
      }
      if (secondNewPair === undefined) {
        newPairs.set(`${newLetter}${pair[1]}`, quantity)
      } else {
        newPairs.set(`${newLetter}${pair[1]}`, secondNewPair + quantity)
      }
    }
  })
  pairMapping.clear()
  each([...newPairs], ([pair, quantity]) => pairMapping.set(pair, quantity))
}

function calculateAnswer() {
  const orderedLetters = orderBy(
    [...letterTally],
    ([_letter, quantity]) => -quantity
  )
  return orderedLetters[0][1] - orderedLetters[orderedLetters.length - 1][1]
}

setInitialLetterTally()
setPairMapping()
setDictionary()
let i = 0
while (i < 40) {
  advanceStep()
  i++
}

console.log(calculateAnswer())
