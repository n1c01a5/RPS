import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Common Shapes
export const _RPSShape = PropTypes.shape({
  c1Hash: PropTypes.string.isRequired,
  js: PropTypes.string.isRequired
})

// Shapes
const {
  shape: RPSShape,
  initialState: RPSInitialState
} = createResource(_RPSShape, {
  withCreate: true
})

export { RPSShape }

// Reducer
const initialState = {
  RPS: RPSInitialState
}

export default createReducer(initialState)
