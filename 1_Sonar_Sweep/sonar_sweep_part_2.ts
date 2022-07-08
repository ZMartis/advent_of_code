import { sum } from 'lodash'
import { depths } from './input'

let counter = 0

function sumDepthsIntoGroups() {
  const groupedDepths: number[] = []
  for (let i = 0; i < depths.length - 2; i++) {
    groupedDepths.push(sum([depths[i], depths[i + 1], depths[i + 2]]))
  }
  return groupedDepths
}

function compareDepthGroups() {
  for (let i = 1; i < sumDepthsIntoGroups().length; i++) {
    if (sumDepthsIntoGroups()[i] > sumDepthsIntoGroups()[i - 1]) {
      counter++
    }
  }
}

compareDepthGroups()
console.log(counter)
