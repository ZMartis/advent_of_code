import { readFileSync } from 'fs'
import {
  each,
  filter,
  flatten,
  includes,
  last,
  map,
  split,
  toLower,
  toUpper,
  uniq,
} from 'lodash'

const connections = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (connection) => split(connection, '-')
)
const nodes = uniq(flatten(connections))
const largeNodes: string[] = filter(nodes, (node) => node === toUpper(node))
const smallNodes: string[] = filter(
  nodes,
  (node) => node !== 'start' && node !== 'end' && node === toLower(node)
)

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
  return filter(otherNodes, (node) => {
    const smallNodeCheck = smallNodeHasBeenRepeated(currentPath)
      ? !includes(currentPath, node)
      : node !== 'start'

    return includes(largeNodes, node) || smallNodeCheck
  })
}

function smallNodeHasBeenRepeated(path: string[]): boolean {
  const set: Set<string> = new Set()
  let smallNodesUsedTwice: boolean = false
  each(path, (node) => {
    if (set.has(node) && includes(smallNodes, node)) {
      smallNodesUsedTwice = true
    } else {
      set.add(node)
    }
  })
  return smallNodesUsedTwice
}

console.log(calculateNumberOfPaths().length)
