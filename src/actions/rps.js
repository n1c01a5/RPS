import { createActions } from 'lessdux'

/* Actions */

// deploy RPS smart contract
export const rps = {
  ...createActions('RPS', {
    withCreate: true
  }),
  MOVE2_RPS: 'MOVE2_RPS',
  SOLVE_RPS: 'SOLVE_RPS'
}

/* Action Creators */

// RPS deploy
export const createRPS = RPS => ({
  type: rps.CREATE,
  payload: { RPS }
})

// move player 2
export const move2RPS = move2 => ({
  type: rps.MOVE2_RPS,
  payload: { move2 }
})

// solve player 1
export const solveRPS = move1 => ({
  type: rps.SOLVE_RPS,
  payload: { move1 }
})
