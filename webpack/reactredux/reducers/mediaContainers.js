import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONNAL_LOCALE_ARTICLES
} from '../constants/ActionTypes'

function mediaContainer(state = {}, action) {
  switch (action.type) {

    default:
      return state
  }
}

export function mediaContainers(state = {}, action) {
  switch (action.type) {
    case LOADED_INITIAL_ARTICLES:
      return action.initialState.mediaContainers

    case LOADED_ADDITIONNAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.mediaContainers)

    default:
      return state
  }
}
