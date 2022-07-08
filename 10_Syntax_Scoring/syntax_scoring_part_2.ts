import { readFileSync } from 'fs'
import {
  each,
  filter,
  includes,
  indexOf,
  map,
  reverse,
  round,
  sortBy,
  split,
} from 'lodash'

const lines: string[] = split(readFileSync('./input.txt', 'utf-8'), '\n')

// -------------------------------------------------------------

const rightSymbols = ['}', ')', ']', '>']

function scoreLines() {
  return map(unpairedSymbolsForEachLine(), (line) => {
    let score = 0
    each(line, (symbol) => {
      score *= 5
      switch (symbol) {
        case '(':
          score += 1
          break
        case '[':
          score += 2
          break
        case '{':
          score += 3
          break
        case '<':
          score += 4
          break
      }
    })
    return score
  })
}

function unpairedSymbolsForEachLine() {
  return map(unfinishedLines(), (line) => {
    return unpairedSymbols(line)
  })
}

function unpairedSymbols(line: string) {
  const reversedLineArray = reverse(split(line, ''))
  const unpairedSymbolsArray: string[] = []

  while (reversedLineArray.length > 0) {
    if (includes(rightSymbols, reversedLineArray[0])) {
      const pairdSymbolIndex = indexOf(
        reversedLineArray,
        leftPair(reversedLineArray[0])
      )
      reversedLineArray.splice(pairdSymbolIndex, 1)
      reversedLineArray.splice(0, 1)
    } else {
      unpairedSymbolsArray.push(reversedLineArray[0])
      reversedLineArray.splice(0, 1)
    }
  }
  return unpairedSymbolsArray
}

function leftPair(symbol: string) {
  switch (symbol) {
    case ')':
      return '('
    case ']':
      return '['
    case '}':
      return '{'
    case '>':
      return '<'
  }
}

function unfinishedLines() {
  return filter(lines, (line) => !checkLine(line))
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
  return isCorrupted
}

function checkIfRightSymbolCorrupted(
  startingIndex: number,
  line: string
): boolean {
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

console.log(sortBy(scoreLines())[round(scoreLines().length / 2) - 1])
