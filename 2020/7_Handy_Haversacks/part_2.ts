import { readFileSync } from 'fs'
import { each, flatten, map, replace, split, sum, toNumber, trim } from 'lodash'

const input = map(
  split(
    replace(
      replace(readFileSync('input.txt', 'utf-8'), /bags/g, ''),
      /bag/g,
      ''
    ),
    '.\n'
  ),
  (rule) => split(rule, ' contain ')
)

const bagDictionary = new Map<string, string[]>()
each(input, (bagLine) => {
  const heldBagsArray = flatten(
    map(split(bagLine[1], ' , '), (heldBag) =>
      split(trim(replace(heldBag, '.', '')), ' , ')
    )
  )
  bagDictionary.set(trim(bagLine[0]), heldBagsArray)
})

function addChildren(containingBag: string): number {
  return sum(
    map(bagDictionary.get(containingBag), (internalBag) => {
      const number = toNumber(internalBag[0])
      const bagName = replace(internalBag, /\d\s/g, '')
      const lowerBagName = bagDictionary.get(bagName) as string[]
      if (lowerBagName[0] === 'no other') {
        return number
      } else {
        return number * addChildren(bagName) + number
      }
    })
  )
}

// function recursiveCountBags(parentBag: string): number {
//   const number
// }

console.log(addChildren('shiny gold'))
