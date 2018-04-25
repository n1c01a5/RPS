import { createActions } from 'lessdux'

// Actions
export const RPS = createActions(
  'RPS',
  {
    withCreate: true
  }
)

// Action Creators
export const createRPS = (c1Hash, j2) => ({
  type: RPS.CREATE,
  payload: { c1Hash, j2 }
})

export const receiveRPS = tx => ({
  type: RPS.RECEIVE,
  payload: { tx }
})
