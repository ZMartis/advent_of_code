import { readFileSync } from 'fs'
import { filter, map, split, toNumber } from 'lodash'

interface PasswordData {
  password: string
  letter: string
  pos1: number
  pos2: number
}

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

const passwordDatas: PasswordData[] = map(input, (line) => {
  const ruleStringAndPassword = split(line, ': ')
  const rangeAndLetter = split(ruleStringAndPassword[0], ' ')
  const range = split(rangeAndLetter[0], '-')
  return {
    password: ruleStringAndPassword[1],
    letter: rangeAndLetter[1],
    pos1: toNumber(range[0]),
    pos2: toNumber(range[1]),
  }
})

const validPasswords = filter(passwordDatas, (passwordData) => {
  return (
    (passwordData.password[passwordData.pos1 - 1] === passwordData.letter &&
      passwordData.password[passwordData.pos2 - 1] !== passwordData.letter) ||
    (passwordData.password[passwordData.pos1 - 1] !== passwordData.letter &&
      passwordData.password[passwordData.pos2 - 1] === passwordData.letter)
  )
})

console.log(validPasswords.length)
