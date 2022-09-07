import { readFileSync } from 'fs'
import { ceil, each, floor, includes, map, sortBy, split } from 'lodash'

const input = split(readFileSync('input.txt', 'utf-8'), '\n')

const rowsAndColumns = map(input, (row) => {
  let rowRange = [0, 127]
  let columnRange = [0, 7]
  each(row, (column) => {
    const rowTrueMiddle = rowRange[0] + (rowRange[1] - rowRange[0]) / 2
    const rowMiddleNumbers = [floor(rowTrueMiddle), ceil(rowTrueMiddle)]
    const columnTrueMiddle =
      columnRange[0] + (columnRange[1] - columnRange[0]) / 2
    const columnMiddleNumbers = [
      floor(columnTrueMiddle),
      ceil(columnTrueMiddle),
    ]
    switch (column) {
      case 'F':
        rowRange[1] = rowMiddleNumbers[0]
        break
      case 'B':
        rowRange[0] = rowMiddleNumbers[1]
        break
      case 'L':
        columnRange[1] = columnMiddleNumbers[0]
        break
      case 'R':
        columnRange[0] = columnMiddleNumbers[1]
        break
      default:
        break
    }
  })
  return [rowRange[0], columnRange[0]]
})

const seatIds = sortBy(map(rowsAndColumns, ([row, column]) => row * 8 + column))

let yourSeat: null | number = null

for (let i = seatIds[0]; i <= seatIds[seatIds.length - 1]; i++) {
  if (!includes(seatIds, i)) {
    yourSeat = i
  }
}

console.log(yourSeat)
