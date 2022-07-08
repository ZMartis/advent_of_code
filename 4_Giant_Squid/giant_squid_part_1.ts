import {
  each,
  every,
  filter,
  flattenDeep,
  includes,
  indexOf,
  map,
  some,
  sum,
} from 'lodash'
import { numbersToCall, boards } from './input'

type Board = (number | 'x')[][]

let calledIndex = 0
let currentNumber: number
const markableBoards = boards

function runGame() {
  callNumber()
  markBoards()
  if (findCompletedBoard() === undefined) {
    runGame()
  }
  return calculateAnswer(findCompletedBoard() as Board)
}

function callNumber() {
  currentNumber = numbersToCall[calledIndex]
  calledIndex++
}

function markBoards() {
  each(markableBoards, (board, boardIndex) => {
    each(board, (row, rowIndex) => {
      if (includes(row, currentNumber)) {
        const numberIndex = indexOf(row, currentNumber)
        markableBoards[boardIndex][rowIndex][numberIndex] = 'x'
      }
    })
  })
}

function findCompletedBoard() {
  let winningBoard: Board | undefined
  each(markableBoards, (board) => {
    if (
      checkBoardLines(board) ||
      checkBoardLines(convertBoardToColumns(board))
    ) {
      winningBoard = board
    }
  })
  return winningBoard ? winningBoard : undefined
}

function checkBoardLines(board: Board) {
  return some(
    map(board, (line) => {
      return every(map(line, (digit) => digit === 'x'))
    })
  )
}

function convertBoardToColumns(board: Board) {
  const newBoard: Board = []
  each(board, (row) => {
    each(row, (number, index) => {
      if (newBoard[index]) {
        newBoard[index].push(number)
      } else {
        newBoard[index] = [number]
      }
    })
  })
  return newBoard
}

function calculateAnswer(winningBoard: Board) {
  return (
    sum(filter(flattenDeep(winningBoard), (number) => number !== 'x')) *
    currentNumber
  )
}

console.log(runGame())
