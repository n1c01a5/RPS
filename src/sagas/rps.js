import { takeLatest, call } from 'redux-saga/effects'

import * as rpsActions from '../actions/rps'
import { lessduxSaga } from '../utils/saga'
import { eth } from '../bootstrap/dapp-api'

import rpsEth from './ethereum/rps'

/**
 * Creates the RPS.
 * @returns {object} - The RPS params.
 */
export function* createRPS ({ type, payload: { RPS } }) {
  const accounts = yield call(eth.accounts)
  if (!accounts[0]) throw new Error('ETH_NO_ACCOUNTS')

  return yield call(rpsEth.deployRPS, RPS, accounts)
}

/**
 * Creates the player 2 move.
 * @returns {object} - The move params.
 */
export function* move2RPS ({ type, payload: { move2 } }) {
  const accounts = yield call(eth.accounts)
  if (!accounts[0]) throw new Error('ETH_NO_ACCOUNTS')

  return yield call(rpsEth.move2, move2, accounts)
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  yield takeLatest(
    rpsActions.rps.CREATE,
    lessduxSaga,
    'create',
    rpsActions.rps,
    createRPS
  )
  yield takeLatest(
    rpsActions.rps.MOVE2_RPS,
    lessduxSaga,
    'create',
    rpsActions.rps,
    move2RPS
  )
}
