import { readFileSync } from 'fs'
import { map, reduce, split } from 'lodash'

type OpponentPlay = 'A' | 'B' | 'C'
type SelfPlay = 'X' | 'Y' | 'Z'
type Game = [OpponentPlay, SelfPlay]
type OpponentPlayOutcomeMapping = {
  A: SelfPlayOutcomeMapping
  B: SelfPlayOutcomeMapping
  C: SelfPlayOutcomeMapping
}
type SelfPlayOutcomeMapping = {
  X: number
  Y: number
  Z: number
}

const games: Game[] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (game) => split(game, ' ') as Game
)

const outcomeValueMapping: OpponentPlayOutcomeMapping = {
  A: {
    X: 1 + 3, // Rock    + Draw
    Y: 2 + 6, // Paper   + Won
    Z: 3 + 0, // Scizors + Lost
  },
  B: {
    X: 1 + 0, // Rock    + Lost
    Y: 2 + 3, // Paper   + Draw
    Z: 3 + 6, // Scizors + Won
  },
  C: {
    X: 1 + 6, // Rock    + Won
    Y: 2 + 0, // Paper   + Lost
    Z: 3 + 3, // Scizors + Draw
  },
}

console.log(
  reduce(
    map(games, (game) => outcomeValueMapping[game[0]][game[1]]),
    (sum, outcome) => sum + outcome,
    0
  )
)
// => 9177
