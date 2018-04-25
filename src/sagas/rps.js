import { takeLatest, call } from 'redux-saga/effects'

import * as rpsActions from '../actions/rps'
import { lessduxSaga } from '../utils/saga'

import rpsEth from './ethereum/rps'

/**
 * Creates the RPS.
 * @returns {object} - The profile.
 */
export function* createRPS ({ type, payload: { rpsGet } }) {
  return yield call(rpsEth.deployRPS, rpsGet)
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
}
