import {
  SET_ARTICLES_VISIBILITY_FILTER
} from '../constants/ActionTypes'


export function setArticlesVisibilityFilter(filter) {
  return { type: SET_ARTICLES_VISIBILITY_FILTER, filter }
}
