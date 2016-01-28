import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONNAL_LOCALE_ARTICLES,
  ADD_NEW_ARTICLE,
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

    case ADD_NEW_ARTICLE:
      const new_state = Object.assign({}, state)
      _.forOwn(new_state, (localeMediaContainersObjects, locale) => {new_state[locale][action.mediaContainer.id] = action.mediaContainer})
      return new_state

    default:
      return state
  }
}
