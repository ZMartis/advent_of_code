import { readFileSync } from 'fs'
import { each, map, min, split, toInteger, toString } from 'lodash'

const smallInput = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (line) => split(line, '')
)

function extendedLines() {
  return map(smallInput, (line) => {
    const extendedLine: string[] = []
    for (let i = 0; i < 5; i++) {
      each(line, (number) => {
        extendedLine.push(
          toString(
            toInteger(number) + i > 9
              ? toInteger(number) + i - 9
              : toInteger(number) + i
          )
        )
      })
    }
    return extendedLine
  })
}

function input() {
  const extendedHeight: string[][] = []
  for (let i = 0; i < 5; i++) {
    each(extendedLines(), (line) => {
      extendedHeight.push(
        map(line, (number) =>
          toString(
            toInteger(number) + i > 9
              ? toInteger(number) + i - 9
              : toInteger(number) + i
          )
        )
      )
    })
  }
  return extendedHeight
}

type DangerNode = {
  position: string
  risk: number
  minimumDangerLevel: number | undefined
}
const width = input()[0].length
const height = input().length
const dangerMapping: Map<string, DangerNode> = new Map()
const diagonalRows: string[][] = map(new Array(width + height - 1), () => [])

function findLeastDangerousPathDangerLevel() {
  setDangerMapping()
  setStartingDangerLevel()
  setDiagonalRows()
  each(diagonalRows, (diagonalRow, rowIndex) => {
    each(diagonalRow, (position) => {
      const dangerNode = dangerMapping.get(position)
      if (rowIndex !== 0 && dangerNode !== undefined) {
        recursivlySetMinimumDangerLevels(dangerNode)
      }
    })
  })
  return dangerMapping.get(`${width - 1},${height - 1}`)?.minimumDangerLevel
}

function setDangerMapping() {
  each(input(), (line, lineIndex) => {
    each(line, (number, numberIndex) =>
      dangerMapping.set(`${numberIndex},${lineIndex}`, {
        position: `${numberIndex},${lineIndex}`,
        risk: toInteger(number),
        minimumDangerLevel: undefined,
      })
    )
  })
}

function setStartingDangerLevel() {
  dangerMapping.set('0,0', {
    position: '0,0',
    risk: dangerMapping.get('0,0')?.risk as number,
    minimumDangerLevel: 0,
  })
}

function setDiagonalRows() {
  each(input(), (line, lineIndex) => {
    each(line, (_number, numberIndex) =>
      diagonalRows[numberIndex + lineIndex].push(`${numberIndex},${lineIndex}`)
    )
  })
}

function recursivlySetMinimumDangerLevels(dangerNode: DangerNode) {
  const surroundingDangerNodes = findSurroundingDangerNodes(dangerNode)
  setMinimumDangerLevel(dangerNode, surroundingDangerNodes)
  const updatedDangerNode = dangerMapping.get(dangerNode.position) as DangerNode
  checkIfSurroundingNodesCanBeReduced(updatedDangerNode, surroundingDangerNodes)
}

function findSurroundingDangerNodes(dangerNode: DangerNode) {
  const surroundingTransformations = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]
  return map(surroundingTransformations, (transformation) => {
    const newPosition: string = stringifyPosition(
      map(
        numberifyPositon(dangerNode.position),
        (number, index) => number + transformation[index]
      )
    )
    return dangerMapping.get(newPosition)
  })
}

function setMinimumDangerLevel(
  dangerNode: DangerNode,
  surroundingDangerNodes: (DangerNode | undefined)[]
) {
  dangerMapping.set(dangerNode.position, {
    position: dangerNode.position,
    risk: dangerNode.risk,
    minimumDangerLevel:
      (min(
        map(
          surroundingDangerNodes,
          (dangerNode) => dangerNode?.minimumDangerLevel
        )
      ) as number) + dangerNode.risk,
  })
}

function checkIfSurroundingNodesCanBeReduced(
  dangerNode: DangerNode,
  surroundingDangerNodes: (DangerNode | undefined)[]
) {
  each(surroundingDangerNodes, (surroundingDangerNode) => {
    if (
      surroundingDangerNode?.minimumDangerLevel !== undefined &&
      dangerNode?.minimumDangerLevel !== undefined
    ) {
      if (
        surroundingDangerNode.minimumDangerLevel >
        dangerNode.minimumDangerLevel + surroundingDangerNode.risk
      ) {
        dangerMapping.set(surroundingDangerNode.position, {
          position: surroundingDangerNode.position,
          risk: surroundingDangerNode.risk,
          minimumDangerLevel:
            dangerNode.minimumDangerLevel + surroundingDangerNode.risk,
        })
        recursivlySetMinimumDangerLevels(surroundingDangerNode)
      }
    }
  })
}

// helper functions

function numberifyPositon(position: string): number[] {
  return map(split(position, ','), (number) => toInteger(number))
}

function stringifyPosition(position: number[]): string {
  return `${position[0]},${position[1]}`
}

console.log(findLeastDangerousPathDangerLevel())
