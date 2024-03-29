export type OpponentPlay = 'A' | 'B' | 'C'
export type SelfPlay = 'X' | 'Y' | 'Z'

export type Game = [OpponentPlay, SelfPlay]

export type OutcomeValueMapping = {
  [key in OpponentPlay]: {
    [key in SelfPlay]: number
  }
}
