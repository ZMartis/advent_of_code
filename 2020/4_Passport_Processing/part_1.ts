import { readFileSync } from 'fs'
import { filter, flatten, map, some, split } from 'lodash'

const passports: string[][][] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n\n'),
  (passport) => {
    return map(
      flatten(map(split(passport, '\n'), (row) => split(row, ' '))),
      (line) => split(line, ':')
    )
  }
)

// filter out passports with less than 7 rows
const almostFullPassports: string[][][] = filter(
  passports,
  (passport) => passport.length >= 7
)

const approvedPassports: string[][][] = filter(
  almostFullPassports,
  (passport) => {
    if (passport.length === 8) {
      return true
    } else if (!passportIncludesCID(passport)) {
      return true
    } else {
      return false
    }
  }
)

// helpers
function passportIncludesCID(passport: string[][]): boolean {
  return some(map(passport, (line) => line[0] === 'cid'))
}

console.log(approvedPassports.length)
