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

let currentNumber: number
let calledIndex = 0
let markableBoards = boards
let lastBoardCompleted: Board

function runGame() {
  callNumber()
  markBoards()
  removeCompletedBoards()
  if (markableBoards.length > 0) {
    runGame()
  }
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

function removeCompletedBoards() {
  markableBoards = filter(markableBoards, (board) => {
    if (checkIfBoardCompleted(board)) {
      lastBoardCompleted = board
    }
    return !checkIfBoardCompleted(board)
  })
}

function checkIfBoardCompleted(board: Board) {
  return checkBoardLines(board) || checkBoardLines(convertBoardToColumns(board))
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

function calculateAnswer() {
  return (
    sum(filter(flattenDeep(lastBoardCompleted), (number) => number !== 'x')) *
    currentNumber
  )
}

runGame()
console.log(calculateAnswer())
