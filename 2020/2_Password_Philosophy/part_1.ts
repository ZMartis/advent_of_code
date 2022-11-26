import { readFileSync } from 'fs'
import { filter, map, split, toNumber } from 'lodash'

interface PasswordData {
  password: string
  letter: string
  min: number
  max: number
}

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

const passwordDatas: PasswordData[] = map(input, (line) => {
  const ruleStringAndPassword = split(line, ': ')
  const rangeAndLetter = split(ruleStringAndPassword[0], ' ')
  const range = split(rangeAndLetter[0], '-')
  return {
    password: ruleStringAndPassword[1],
    letter: rangeAndLetter[1],
    min: toNumber(range[0]),
    max: toNumber(range[1]),
  }
})

const validPasswords = filter(passwordDatas, (passwordData) => {
  const numberOfLettersInPassword = filter(
    [...passwordData.password],
    (letter) => letter === passwordData.letter
  ).length
  return (
    numberOfLettersInPassword >= passwordData.min &&
    numberOfLettersInPassword <= passwordData.max
  )
})

console.log(validPasswords.length)
