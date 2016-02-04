import {
  MARK_ARTICLE_PICTURE_FOR_DELETION,
   } from '../constants/ActionTypes'

export function articlePicturesMarkedForDeletionByArticleId(state = {}, action) {
  switch (action.type) {
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      const newState = {...state};
      // if there is already an entry for this articleId in the markedForDeletion array, use it,
      // else create it with an empty array as default value
      newState[action.articleId] = newState[action.articleId] || [];
      // Push the articlePictureId to the array of articlePictures marked for deletion
      newState[action.articleId].push(action.articlePictureId);
      return newState

  default:
    return state
  }
}
