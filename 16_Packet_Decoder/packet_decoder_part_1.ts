import { readFileSync } from 'fs'
import { each, join, split } from 'lodash'
import { bianaryDictionary } from './bianary_dictionary'

const input: string[] = split(readFileSync('input.txt', 'utf-8'), '')

function convertInputToBianary() {
  const bianaryString: string[] = []
  each(input, (letter) => {
    const bianaryConversion = bianaryDictionary.get(letter)
    if (bianaryConversion !== undefined) {
      bianaryString.push(bianaryConversion)
    }
  })
  return join(bianaryString, '')
}

console.log(convertInputToBianary())
