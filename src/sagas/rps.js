import Eth from 'ethjs'

import { takeLatest, select, all, call, put } from 'redux-saga/effects'

import * as rpsActions from '../actions/rps'
import * as walletSelectors from '../reducers/wallet'
import { eth, RPSContractFactory } from '../bootstrap/dapp-api'
import { action } from '../utils/action'
import { fetchSaga } from '../utils/saga'

/**
 * Creates RPS smart contract.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection.
 */
function* createRPS({
  payload: {
    c1Hash: _c1Hash,
    j2: _j2
  }
}) {
  console.log('create rps')
  return {tx: 'tx'}
}

/**
 * The root of the RPS saga.
 */
export default function* RPSSaga() {
   // Balance
   yield takeLatest(
     rpsActions.RPS.CREATE,
     fetchSaga,
     rpsActions.RPS,
     createRPS
   )
}
