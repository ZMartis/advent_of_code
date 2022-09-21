import { ceil, each, floor, max, mean, min, subtract } from 'lodash'
import { horizontalPositions } from './input'

const meanCeiling = ceil(mean(horizontalPositions))
const meanFloor = floor(mean(horizontalPositions))

function findGasUsed(number: number) {
  let gasUsed = 0
  each(horizontalPositions, (position) => {
    gasUsed =
      gasUsed +
      additionFactorial(
        subtract(
          max([position, number]) as number,
          min([position, number]) as number
        )
      )
  })
  return gasUsed
}

function additionFactorial(number: number): number {
  if (number === 0 || number === 1) {
    return number
  } else {
    return number + additionFactorial(number - 1)
  }
}

console.log(min([findGasUsed(meanCeiling), findGasUsed(meanFloor)]))
