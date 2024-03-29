import { readFileSync } from 'fs'
import { map, reduce, split } from 'lodash'
import { Game, OutcomeValueMapping } from './types'

const outcomeValueMapping: OutcomeValueMapping = {
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

const games: Game[] = map(
  split(readFileSync('input.txt', 'utf-8'), '\n'),
  (game) => split(game, ' ') as Game
)

console.log(
  reduce(games, (sum, game) => sum + outcomeValueMapping[game[0]][game[1]], 0)
)
// => 9177
