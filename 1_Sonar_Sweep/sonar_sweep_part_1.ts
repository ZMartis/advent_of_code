import { each } from 'lodash'
import { depths } from './input'

let counter = 0
function compareDepths() {
  each(depths, (depth, index) => {
    if (depth > depths[index - 1]) {
      counter++
    }
  })
}

compareDepths()
console.log(counter)
