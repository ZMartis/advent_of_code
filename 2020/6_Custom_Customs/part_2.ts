import { readFileSync } from 'fs'
import { intersection, map, split, sum } from 'lodash'

const input = map(
  split(readFileSync('input.txt', 'utf-8'), '\n\n'),
  (group: string) => split(group, /\n/)
)

const commonLettersInGroups = map(input, (group) =>
  intersection(...map(group, (personAnswers) => [...personAnswers]))
)
const letterCountForGroups = map(commonLettersInGroups, (group) => group.length)

console.log(sum(letterCountForGroups))
