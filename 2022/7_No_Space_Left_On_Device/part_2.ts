import { readFileSync } from 'fs'

const input = readFileSync('input.txt', 'utf-8').split('\n')

const availableSpace = 70000000
// --------------

class MyNode {
  name: string
  parent: MyNode | undefined
  children: MyNode[]
  fileSizes: number
  totalSize: number

  constructor(
    name: string,
    parent?: MyNode | undefined,
    fileSizes: number = 0,
    children: MyNode[] = []
  ) {
    this.name = name
    this.parent = parent
    this.children = children
    this.fileSizes = fileSizes
    this.totalSize = 0
  }

  addTotalSizes(size: number) {
    this.totalSize += size

    if (this.parent !== undefined) {
      this.parent.addTotalSizes(size)
    }
  }
}

function fileSystem() {
  let head = new MyNode('dummy', undefined)
  head.children.push(new MyNode('/', head))
  let current = head

  for (let i = 0; i < input.length; i++) {
    if (input[i].substring(0, 4) === '$ cd') {
      if (current.parent !== undefined && input[i].substring(5) === '..') {
        current = current.parent
      } else {
        current =
          current.children[
            current.children.findIndex(
              (node) => node.name === input[i].substring(5)
            )
          ]
      }
    } else if (input[i].substring(0, 3) === 'dir') {
      current.children.push(new MyNode(input[i].substring(4), current))
    } else if (input[i].substring(0, 4) !== '$ ls') {
      current.fileSizes += parseInt(input[i].split(' ')[0])
      current.addTotalSizes(parseInt(input[i].split(' ')[0]))
    }
  }
  return head.children[0]
}

function directoryToRemove() {
  // find already free space
  // iterate through dirs and find the nearest directory to and over 30000000 - free space

  const stack: MyNode[] = [fileSystem()]

  const freeSpace = availableSpace - stack[0].totalSize
  const sizeToFind = 30000000 - freeSpace

  let smallestDirectorySize = availableSpace

  while (stack.length > 0) {
    const current = stack.pop()

    if (current) {
      if (
        current.totalSize >= sizeToFind &&
        smallestDirectorySize - sizeToFind > current.totalSize - sizeToFind
      ) {
        smallestDirectorySize = current.totalSize
      }
      if (current !== undefined && current?.children.length > 0) {
        stack.push(...current.children)
      }
    }
  }

  return smallestDirectorySize
}

console.log(directoryToRemove())
