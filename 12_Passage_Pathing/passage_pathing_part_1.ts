import { readFileSync } from 'fs'
import {
  filter,
  flatten,
  includes,
  last,
  map,
  split,
  toUpper,
  uniq,
} from 'lodash'

const connections = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (connection) => split(connection, '-')
)
const nodes = uniq(flatten(connections))
const largeNodes: string[] = filter(nodes, (node) => node === toUpper(node))

function calculateNumberOfPaths() {
  const stack: string[][] = [['start']]
  const paths: string[][] = [[]]
  while (stack.length !== 0) {
    const currentNode = last(stack)?.pop() as string
    last(paths)?.push(currentNode)
    const nextOptions = findNextOptions(currentNode, last(paths) as string[])
    if (currentNode === 'end' || nextOptions.length === 0) {
      while (last(stack)?.length === 0) {
        stack.pop()
      }
      paths.push(last(paths)?.slice(0, stack.length - 1) as string[])
    } else {
      stack.push(nextOptions)
    }
  }
  return filter(paths, (path) => (last(path) as string) === 'end')
}

function findNextOptions(currentNode: string, currentPath: string[]) {
  const allConnectionNodes = filter(connections, (connection) =>
    includes(connection, currentNode)
  )
  const otherNodes = filter(
    uniq(flatten(allConnectionNodes)),
    (node) => node !== currentNode
  )
  return filter(
    otherNodes,
    (node) => includes(largeNodes, node) || !includes(currentPath, node)
  )
}

console.log(calculateNumberOfPaths().length)
