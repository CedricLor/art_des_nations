import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONNAL_LOCALE_ARTICLES,
  ADD_NEW_ARTICLE,
} from '../constants/ActionTypes'

function articlePicture(state = {}, action) {
  switch (action.type) {

    default:
      return state
  }
}

export function articlePictures(state = {}, action) {
  switch (action.type) {
    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlePictures

    case LOADED_ADDITIONNAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlePictures)

    case ADD_NEW_ARTICLE:
      const new_state = Object.assign({}, state)
      new_state[action.locale][action.articlePicture.id] = action.articlePicture
      return new_state

    default:
      return state
  }
}
