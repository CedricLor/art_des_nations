import { SET_ARTICLES_VISIBILITY_FILTER, ArticlesVisibilityFilters } from '../constants/ActionTypes'
const { SHOW_PUBLISHED } = ArticlesVisibilityFilters

export function articlesVisibilityFilter(state = SHOW_PUBLISHED, action) {
  switch (action.type) {
    case SET_ARTICLES_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
