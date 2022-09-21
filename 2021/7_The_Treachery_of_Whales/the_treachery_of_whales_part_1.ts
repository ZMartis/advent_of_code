import { each, max, min, round, sortBy, subtract } from 'lodash'
import { horizontalPositions } from './input'

const orderedPositions = sortBy(horizontalPositions)
const median = orderedPositions[round(orderedPositions.length / 2) - 1]

function findGasUsed() {
  let gasUsed = 0
  each(orderedPositions, (position) => {
    gasUsed =
      gasUsed +
      subtract(
        max([position, median]) as number,
        min([position, median]) as number
      )
  })
  return gasUsed
}

console.log(findGasUsed())
