import { readFileSync } from 'fs'
import { each, includes, map, split, sum } from 'lodash'

const lines: string[] = split(readFileSync('./input.txt', 'utf-8'), '\n')

// ---------------------------------------------------------------

const rightSymbols = ['}', ')', ']', '>']
const corruptedSymbols: string[] = []

function setCorruptedSymbols() {
  each(lines, (line) => checkLine(line))
}

function checkLine(line: string) {
  let index = 0
  let isCorrupted = false
  while (index < line.length && isCorrupted === false) {
    if (includes(rightSymbols, line[index])) {
      isCorrupted = checkIfRightSymbolCorrupted(index, line)
      index++
    } else {
      index++
    }
  }
}

function checkIfRightSymbolCorrupted(startingIndex: number, line: string) {
  let rightSymbolTally = 1
  let indexToCompare = startingIndex - 1
  let isCorrupted = false
  while (indexToCompare >= 0 && rightSymbolTally > 0 && isCorrupted === false) {
    if (includes(rightSymbols, line[indexToCompare])) {
      rightSymbolTally++
      indexToCompare--
    } else {
      rightSymbolTally--
      if (rightSymbolTally === 0) {
        isCorrupted = !symbolsMatch(line[startingIndex], line[indexToCompare])
        isCorrupted ? corruptedSymbols.push(line[startingIndex]) : null
      } else {
        indexToCompare--
      }
    }
  }
  return isCorrupted
}

function symbolsMatch(rightSymbol: string, leftSymbol: string): boolean {
  switch (rightSymbol) {
    case ')':
      return leftSymbol === '('
    case ']':
      return leftSymbol === '['
    case '}':
      return leftSymbol === '{'
    case '>':
      return leftSymbol === '<'
    default:
      return true
  }
}

function totalErrorPoints() {
  return sum(
    map(corruptedSymbols, (symbol) => {
      switch (symbol) {
        case ')':
          return 3
        case ']':
          return 57
        case '}':
          return 1197
        case '>':
          return 25137
        default:
          break
      }
    })
  )
}

setCorruptedSymbols()
console.log(totalErrorPoints())
