import { readFileSync } from 'fs'
import { map, replace, split, sum, uniq } from 'lodash'

const input = map(
  split(readFileSync('input.txt', 'utf-8'), '\n\n'),
  (group: string) => replace(group, /\n/g, '')
)

const uniqueLettersForGroups = map(input, (group) => uniq(group))
const letterCountForGroups = map(
  uniqueLettersForGroups,
  (group) => group.length
)

console.log(sum(letterCountForGroups))
