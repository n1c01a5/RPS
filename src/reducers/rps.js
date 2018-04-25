import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Shapes
const {
  shape: rpsShape,
  initialState: rpsInitialState
} = createResource(PropTypes.string)
export { rpsShape }

// Reducer
export default createReducer({
  rps: rpsInitialState
})

// Selectors
