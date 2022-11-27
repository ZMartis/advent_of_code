import { readFileSync } from 'fs'
import { cloneDeep, each, filter, includes, map, split, toNumber } from 'lodash'

interface CommandLine {
  command: 'jmp' | 'acc' | 'nop'
  value: number
}

const input: CommandLine[] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (line) => {
    const splitLine = split(line, ' ')
    return {
      command: splitLine[0] as CommandLine['command'],
      value: toNumber(splitLine[1]),
    }
  }
)

// ------------------------

const finalList = map(input, (line, index) => {
  const coppiedInput = cloneDeep(input)
  coppiedInput[index].command =
    line.command === 'acc' ? 'acc' : line.command === 'jmp' ? 'nop' : 'jmp'
  return runProgram(coppiedInput)
})

function runProgram(commandLines: CommandLine[]) {
  const indexesRun: number[] = []

  let currentIndex = 0
  let accumultaor = 0

  while (
    !includes(indexesRun, currentIndex) &&
    currentIndex < commandLines.length
  ) {
    if (commandLines[currentIndex].command === 'acc') {
      accumultaor += commandLines[currentIndex].value
      indexesRun.push(currentIndex)
      currentIndex++
    } else if (commandLines[currentIndex].command === 'jmp') {
      indexesRun.push(currentIndex)
      currentIndex += commandLines[currentIndex].value
    } else if (commandLines[currentIndex].command === 'nop') {
      indexesRun.push(currentIndex)
      currentIndex++
    }
  }

  // return accumultaor
  return currentIndex >= commandLines.length - 1 ? accumultaor : undefined
}

console.log(filter(finalList, (answer) => answer !== undefined)[0])
