import { readFileSync } from 'fs'
import {
  each,
  endsWith,
  every,
  filter,
  flatten,
  includes,
  map,
  replace,
  some,
  split,
  toNumber,
} from 'lodash'

type Passport = Map<
  'byr' | 'iyr' | 'eyr' | 'hgt' | 'hcl' | 'ecl' | 'pid' | 'cid',
  string
>

const passports: string[][][] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n\n'),
  (passport) => {
    return map(
      flatten(map(split(passport, '\n'), (row) => split(row, ' '))),
      (line) => split(line, ':')
    )
  }
)

const almostFullPassports: string[][][] = filter(
  passports,
  (passport) => passport.length >= 7
)

const passportsWithCorrectFields: string[][][] = filter(
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

const mappedPassports: Passport[] = []

each(passportsWithCorrectFields, (passport) => {
  mappedPassports.push(
    new Map<
      'byr' | 'iyr' | 'eyr' | 'hgt' | 'hcl' | 'ecl' | 'pid' | 'cid',
      string
    >()
  )
  each(passport, ([key, value]) =>
    mappedPassports[mappedPassports.length - 1].set(
      key as 'byr' | 'iyr' | 'eyr' | 'hgt' | 'hcl' | 'ecl' | 'pid' | 'cid',
      value
    )
  )
})

const validatedPassports = filter(mappedPassports, (passport) => {
  const passed = every([
    byrApproved(passport),
    iyrApproved(passport),
    eyrApproved(passport),
    hgtApproved(passport),
    hclApproved(passport),
    eclApproved(passport),
    pidApproved(passport),
  ])
  return passed
})

// helpers
function passportIncludesCID(passport: string[][]): boolean {
  return some(map(passport, (line) => line[0] === 'cid'))
}

function byrApproved(passport: Passport) {
  const value = passport.get('byr')
  return (
    value?.length === 4 && toNumber(value) >= 1920 && toNumber(value) <= 2002
  )
}
function iyrApproved(passport: Passport) {
  const value = passport.get('iyr')
  return (
    value?.length === 4 && toNumber(value) >= 2010 && toNumber(value) <= 2020
  )
}
function eyrApproved(passport: Passport) {
  const value = passport.get('eyr')
  return (
    value?.length === 4 && toNumber(value) >= 2020 && toNumber(value) <= 2030
  )
}
function hgtApproved(passport: Passport) {
  const value = passport.get('hgt') as string
  if (endsWith(value, 'cm')) {
    return (
      toNumber(replace(value, 'cm', '')) >= 150 &&
      toNumber(replace(value, 'cm', '')) <= 193
    )
  } else if (endsWith(value, 'in')) {
    return (
      toNumber(replace(value, 'in', '')) >= 59 &&
      toNumber(replace(value, 'in', '')) <= 76
    )
  } else {
    return false
  }
}
function hclApproved(passport: Passport) {
  const value = passport.get('hcl') as string

  return value[0] === '#' && value.length === 7 && /^#[0-9A-F]{6}$/i.test(value)
}
function eclApproved(passport: Passport) {
  const value = passport.get('ecl')
  const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  return includes(validEyeColors, value)
}
function pidApproved(passport: Passport) {
  const value = passport.get('pid')
  return value?.length === 9
}

console.log(validatedPassports.length)
