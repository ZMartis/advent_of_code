import { readFileSync } from 'fs'
import { each, join, map, replace, split, sum, toNumber } from 'lodash'

interface CommandInfo {
  command: 'mask' | 'mem'
  memoryAddress?: number | undefined
  binaryString: string
}

const input: CommandInfo[] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (line) => {
    const splitLine = split(line, ' = ')
    if (splitLine[0] === 'mask') {
      return {
        command: splitLine[0],
        binaryString: splitLine[1],
      }
    } else {
      const splitCommand = split(splitLine[0], '[')
      return {
        command: 'mem',
        memoryAddress: toNumber(replace(splitCommand[1], ']', '')),
        binaryString: decimalTo36BitBinary(toNumber(splitLine[1])),
      }
    }
  }
)

function run() {
  const memoryAddressMap = new Map<number, number>()
  let mask: CommandInfo['binaryString']

  each(input, ({ command, memoryAddress, binaryString }) => {
    if (command === 'mask') {
      mask = binaryString
    } else if (memoryAddress !== undefined) {
      memoryAddressMap.set(
        memoryAddress,
        toNumber(binaryToString(combineMaskAndNumber(mask, binaryString)))
      )
    }
  })

  return sum(map([...memoryAddressMap], (pairing) => pairing[1]))
}

function combineMaskAndNumber(
  mask: CommandInfo['binaryString'],
  binaryString: CommandInfo['binaryString']
) {
  return join(
    map(split(mask, ''), (digit, index) =>
      digit === 'X' ? binaryString[index] : digit
    ),
    ''
  )
}

// ------------------------

function decimalTo36BitBinary(decimal: number) {
  let binaryString = (decimal >>> 0).toString(2)
  while (binaryString.length < 36) {
    binaryString = '0' + binaryString
  }
  return binaryString
}

function binaryToString(binary: string) {
  return parseInt(binary, 2).toString(10)
}

console.log(run())
