import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import wallet from './wallet'
import rps from './rps'

// Export root reducer
export default combineReducers({
  router,
  form,
  wallet,
  rps
})
