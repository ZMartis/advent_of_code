import { readFileSync } from 'fs'
import { each, filter, flatten, map, replace, split, trim } from 'lodash'

const input = map(
  split(
    replace(
      replace(
        replace(readFileSync('input.txt', 'utf-8'), /bags/g, ''),
        /bag/g,
        ''
      ),
      /\d\s/g,
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

// recursively find the shiny gold bag
const bagsThatCanEventuallyContainShinyGold = filter(
  [...bagDictionary.keys()],
  (containingBag) => {
    return canContainShindyGold(containingBag)
  }
)

function canContainShindyGold(containingBag: string): boolean {
  let containsShinyGold = false
  function recursivelyCheck(containingBag: string) {
    each(bagDictionary.get(containingBag), (interiorBag) => {
      if (interiorBag === 'shiny gold') {
        containsShinyGold = true
      } else if (interiorBag !== 'no other') {
        recursivelyCheck(interiorBag)
      }
    })
  }
  recursivelyCheck(containingBag)
  return containsShinyGold
}

console.log(bagsThatCanEventuallyContainShinyGold.length)
