import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
  ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
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

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
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

    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
      const newStateForNewStoredPicture = Object.assign({}, state)
      newStateForNewStoredPicture[action.locale][action.articlePictureId] = {
        for_card: action.forCard,
        for_carousel: action.forCarousel,
        id: action.articlePictureId,
        media_container_id: undefined,
        stored_file_id: action.storedFileId,
      }
      return newStateForNewStoredPicture

    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
      const newStateForNewStoredPictureInExistingArticlePicture = Object.assign({}, state)
      newStateForNewStoredPictureInExistingArticlePicture[action.locale][action.articlePictureId]['for_carousel'] = action.forCarousel;
      newStateForNewStoredPictureInExistingArticlePicture[action.locale][action.articlePictureId]['for_card'] = action.forCard;
      newStateForNewStoredPictureInExistingArticlePicture[action.locale][action.articlePictureId]['stored_file_id'] = action.storedFileId;
      return newStateForNewStoredPictureInExistingArticlePicture

    default:
      return state
  }
}
