import { each } from 'lodash'
import { startingFish } from './input'
import { Fish } from './types'

const latestGeneration = startingFish

function advanceGeneration() {
  each(latestGeneration, (fish, index) => {
    if (fish === 0) {
      latestGeneration.push(8)
      latestGeneration.splice(index, 1, 6)
    } else {
      latestGeneration.splice(index, 1, (fish - 1) as Fish)
    }
  })
}

let i = 0
while (i < 80) {
  advanceGeneration()
  i++
}
console.log(latestGeneration.length)
