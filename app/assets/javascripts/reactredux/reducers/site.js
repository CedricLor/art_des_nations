import { TOGGLE_SITE_EDIT_MODE } from '../constants/ActionTypes'

export function siteEditMode(state = { mode: false }, action) {
  switch (action.type) {
    case TOGGLE_SITE_EDIT_MODE:
      return Object.assign({}, state, { mode: !state.mode })
    default:
      return state
  }
}

