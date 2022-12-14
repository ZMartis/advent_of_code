import { readFileSync } from 'fs'

const input: string = readFileSync('input.txt', 'utf-8').toString()

// initialize a window of 4 characters (array)
// start iterating over all characters at index 3
// check if each character is unique

let currentIndex: number = 3

const charWindow: string[] = []
for (let i = 0; i <= currentIndex; i++) {
  charWindow.push(input[i])
}

while (!allUnique(charWindow)) {
  currentIndex++
  charWindow.shift()
  charWindow.push(input[currentIndex])
}

function allUnique(window: string[]): boolean {
  const usableWindow = [...window]
  let char: string | undefined
  while (usableWindow.length > 0) {
    char = usableWindow.shift()
    if (char !== undefined && usableWindow.includes(char)) {
      return false
    }
  }
  return true
}

console.log(currentIndex + 1)
