import {
  LOADED_INITIAL_ARTICLES,
  LOADING_ADDITIONAL_LOCALE_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  FETCHING_INFINITE_SCROLL_DATA,
  RECEIVED_INFINITE_SCROLL_DATA
} from '../constants/ActionTypes'

// const initialState = {
//   initialData: false,
//   infiniteScrollData: false,
// }

export function isFetching(state = {}, action) {
  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return Object.assign({}, state, {initialData: false})

    case LOADING_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, {additionalLocaleArticle: true})

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, {additionalLocaleArticle: false})

    case FETCHING_INFINITE_SCROLL_DATA:
      return state[infiniteScrollData] = true

    case RECEIVED_INFINITE_SCROLL_DATA:
      return state[infiniteScrollData] = false

    default:
      return state
  }
}
