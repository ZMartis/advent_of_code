import { cloneDeep, filter } from 'lodash'
import { startingFish } from './input'

const fishTally = new Map<number, number>()

function initialFishTally() {
  for (let i = 0; i <= 8; i = i + 1) {
    const tallyEachNumber = filter(startingFish, (fish) => fish === i).length
    fishTally.set(i, tallyEachNumber)
  }
}

function advanceGeneration() {
  const fishTallyClone = cloneDeep(fishTally)
  for (let i = 0; i <= 8; i = i + 1) {
    if (i === 8) {
      fishTally.set(8, fishTallyClone.get(0) as number)
    } else if (i === 6) {
      const value0 = fishTallyClone.get(0) as number
      const value7 = fishTallyClone.get(7) as number
      fishTally.set(i, value0 + value7)
    } else {
      const value = fishTallyClone.get(i + 1) as number
      fishTally.set(i, value)
    }
  }
}

function totalFish() {
  let total = 0
  for (let i = 0; i <= 8; i++) {
    total = total + (fishTally.get(i) as number)
  }
  return total
}

initialFishTally()
let i = 0
while (i < 256) {
  advanceGeneration()
  i++
}
console.log(totalFish())
