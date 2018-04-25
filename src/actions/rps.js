import { createActions } from 'lessdux'

/* Actions */

// deploy RPS smart contract
export const rps = {
  ...createActions('RPS', {
    withCreate: true
  })
}

/* Action Creators */

// Profile
export const createRPS = rpsTx => ({
  type: rps.CREATE,
  payload: { rpsTx }
})
