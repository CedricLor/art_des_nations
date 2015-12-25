import { combineReducers } from 'redux'
import { TOGGLE_EDIT_MODE } from '../actions/actions'

function siteEditMode(state = { mode: false }, action) {
  switch (action.type) {
    case TOGGLE_EDIT_MODE:
      const new_state = Object.assign({}, state, {
                    mode: !state.mode
                  })
      return new_state
    default:
      return state
  }
}

function articles(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  siteEditMode,
  articles
})

export default rootReducer
