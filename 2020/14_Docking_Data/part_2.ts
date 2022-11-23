import { readFileSync } from 'fs'
import { each, filter, join, map, replace, split, sum, toNumber } from 'lodash'

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
        binaryString: decimalToBitBinary(toNumber(splitLine[1]), 36),
      }
    }
  }
)

// Main Function -------------------

function run() {
  const memoryAddressMap = new Map<number, number>()
  let mask: CommandInfo['binaryString']

  each(input, ({ command, memoryAddress, binaryString }) => {
    if (command === 'mask') {
      mask = binaryString
    } else if (memoryAddress !== undefined) {
      const fluxMemoryAddress: string[] = createFlexMemoryAddress(
        mask,
        memoryAddress
      )
      const collapsedMemoryAddresses =
        collapseMemoryAddresses(fluxMemoryAddress)

      each(collapsedMemoryAddresses, (calculatedMemoryAddress) => {
        memoryAddressMap.set(
          calculatedMemoryAddress,
          toNumber(binaryToString(binaryString))
        )
      })
    }
  })
  return sum(map([...memoryAddressMap], (pairing) => pairing[1]))
}

// Secondary Functions ---------------

function createFlexMemoryAddress(
  mask: CommandInfo['binaryString'],
  initialMemoryAddress: CommandInfo['memoryAddress']
) {
  return map(split(mask, ''), (digit, index) =>
    digit === '0'
      ? decimalToBitBinary(initialMemoryAddress as number, 36)[index]
      : digit
  )
}

function collapseMemoryAddresses(fluxMemoryAddress: string[]) {
  let memoryAddresses: number[] = []
  const numberOfFlexDigits = filter(
    fluxMemoryAddress,
    (digit) => digit === 'X'
  ).length

  for (let i = 0; i < 2 ** numberOfFlexDigits; i++) {
    const binaryString = decimalToBitBinary(i, numberOfFlexDigits)
    let currentBinaryStringIndex = 0
    memoryAddresses.push(
      toNumber(
        binaryToString(
          join(
            map(fluxMemoryAddress, (digit) => {
              if (digit === 'X') {
                const newDigit = binaryString[currentBinaryStringIndex]
                currentBinaryStringIndex++
                return newDigit
              } else {
                return digit
              }
            }),
            ''
          )
        )
      )
    )
  }
  return memoryAddresses
}

// Helper Functions ------------------------

function decimalToBitBinary(decimal: number, length: number) {
  let binaryString = (decimal >>> 0).toString(2)
  while (binaryString.length < length) {
    binaryString = '0' + binaryString
  }
  return binaryString
}

function binaryToString(binary: string) {
  return parseInt(binary, 2).toString(10)
}

console.log(run())
