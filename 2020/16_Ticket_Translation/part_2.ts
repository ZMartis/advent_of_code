import { readFileSync } from 'fs'
import {
  camelCase,
  each,
  every,
  filter,
  flatten,
  floor,
  includes,
  intersection,
  map,
  pull,
  reduce,
  split,
  startsWith,
  toNumber,
} from 'lodash'

interface Rules {
  [key: string]: RangeObject
}

interface RangeObject {
  lowMin: number
  lowMax: number
  highMin: number
  highMax: number
}

const input = split(readFileSync('input.txt', 'utf-8'), '\n\n')

let rules: Rules = {}
each(split(input[0], '\n'), (line) => {
  const splitLine = split(line, ': ')
  const ranges = split(splitLine[1], ' or ')
  const lowRange = split(ranges[0], '-')
  const highRange = split(ranges[1], '-')
  rules[camelCase(splitLine[0])] = {
    lowMin: toNumber(lowRange[0]),
    lowMax: toNumber(lowRange[1]),
    highMin: toNumber(highRange[0]),
    highMax: toNumber(highRange[1]),
  }
})
const myTicket = map(split(split(input[1], ':\n')[1], ','), (string) =>
  toNumber(string)
)
const nearbyTickets = map(split(split(input[2], ':\n')[1], '\n'), (line) =>
  map(split(line, ','), (string) => toNumber(string))
)

// ---------------------------
const invalidTicketIndexes: number[] = []

function run() {
  findInvalidTickets()
  const validTickets = filterValidTickets()
  const ruleMapPositions = numberIndexToRuleMap(validTickets)
  const orderOfRules = collapseRuleMap(ruleMapPositions)
  return calculateAnswer(orderOfRules)
}

// ----------------

function calculateAnswer(orderOfRules: string[]) {
  const departureIndexes: number[] = []
  each(orderOfRules, (rule, index) => {
    if (startsWith(rule, 'departure')) {
      departureIndexes.push(index)
    }
  })
  return reduce(
    map(departureIndexes, (number) => myTicket[number]),
    (mult, n) => mult * n
  )
}

function collapseRuleMap(mapping: Map<number, string[]>) {
  const possibleRulesForEachIndex = [...mapping.values()]
  while (!every(map([...mapping], ([_key, value]) => value.length === 1))) {
    each(possibleRulesForEachIndex, (possibleRulesForIndex, currentIndex) => {
      if (possibleRulesForIndex.length === 1) {
        each(possibleRulesForEachIndex, (_value, checkedIndex) => {
          if (currentIndex !== checkedIndex) {
            pull(
              possibleRulesForEachIndex[checkedIndex],
              possibleRulesForIndex[0]
            )
          }
        })
      }
    })
  }
  return flatten(possibleRulesForEachIndex)
}

function numberIndexToRuleMap(tickets: number[][]): Map<number, string[]> {
  const mapping = new Map<number, string[]>()
  // initialize 0 - ticket.length with every rule
  for (let i = 0; i < 20; i++) {
    mapping.set(i, Object.keys(rules))
  }

  for (let i = 0; i < nearbyTickets.length - 1; i++) {
    each(tickets[i], (number, index) => {
      const possibleRulesForNumber: string[] = []
      each(rules, (value, key) => {
        if (
          (number >= value.lowMin && number <= value.lowMax) ||
          (number >= value.highMin && number <= value.highMax)
        ) {
          possibleRulesForNumber.push(key)
        }
      })
      mapping.set(
        index,
        intersection(mapping.get(index), possibleRulesForNumber)
      )
    })
  }

  return mapping
}

function filterValidTickets() {
  return filter(
    nearbyTickets,
    (_ticket, index) => !includes(invalidTicketIndexes, index)
  )
}

function findInvalidTickets(): void {
  const invalidNumberSet = new Set<number>()
  each(flatten(nearbyTickets), (number, numberIndex) => {
    if (invalidNumberSet.has(number)) {
      invalidTicketIndexes.push(ticketIndex(numberIndex))
    } else if (numberIsInvalid(number)) {
      invalidNumberSet.add(number)
      invalidTicketIndexes.push(ticketIndex(numberIndex))
    }
  })
}

function numberIsInvalid(number: number) {
  const keys = Object.keys(rules)
  return every(
    map(
      keys,
      (key) =>
        !(number >= rules[key].lowMin && number <= rules[key].lowMax) &&
        !(number >= rules[key].highMin && number <= rules[key].highMax)
    )
  )
}

function ticketIndex(numberIndex: number) {
  return floor(numberIndex / myTicket.length)
}

console.log(run())
