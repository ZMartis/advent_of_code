import { filter, flatten, map, split } from 'lodash'
import { outputs } from './input'

console.log(
  filter(
    flatten(map(outputs, (line) => split(line, ' '))),
    (digit) =>
      digit.length === 2 ||
      digit.length === 3 ||
      digit.length === 4 ||
      digit.length === 7
  ).length
)
