import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONNAL_LOCALE_ARTICLES,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
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
      const newStateForNewArticle = Object.assign({}, state)
      _.forOwn(newStateForNewArticle, (localeArticlePicturesObjects, locale) => {newStateForNewArticle[locale][action.articlePicture.id] = action.articlePicture})
      return newStateForNewArticle

    case DELETE_ARTICLE:
      const newStateForDeleteArticle = Object.assign({}, state)
      _.forEach(action.articlePictureIds, (articlePictureId) => {
        _.forOwn(newStateForDeleteArticle, (localeArticlePicturesObjects, locale) => {delete newStateForDeleteArticle[locale][action.articlePictureId]})
      })
      return newStateForDeleteArticle

    default:
      return state
  }
}
