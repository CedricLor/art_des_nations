import {
  LOADED_INITIAL_DATA,
  FETCHING_INFINITE_SCROLL_DATA,
  RECEIVED_INFINITE_SCROLL_DATA
} from '../constants/ActionTypes'

// const initialState = {
//   initialData: false,
//   infiniteScrollData: false,
// }

export function isFetching(state = {}, action) {
  switch (action.type) {

    case LOADED_INITIAL_DATA:
      return Object.assign({}, state, {initialData: false})

    case FETCHING_INFINITE_SCROLL_DATA:
      return state[infiniteScrollData] = true

    case RECEIVED_INFINITE_SCROLL_DATA:
      return state[infiniteScrollData] = false

    default:
      return state
  }
}
