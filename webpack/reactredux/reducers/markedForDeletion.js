import {
  MARK_ARTICLE_PICTURE_FOR_DELETION,
  DELETE_ART_PICTURES_MARKED_FOR_DELETION_AND_CORRESPONDING_STORED_FILES,
} from '../constants/ActionTypes'

function articlePicturesMarkedForDeletionForArticle(state = [], action) {
  switch (action.type) {
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return [
        action.articlePictureId,
        ...state
      ]

  default:
    return state
  }
}

export function articlePicturesMarkedForDeletionByArticleId(state = {}, action) {
  switch (action.type) {
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return Object.assign({}, state, {
        [action.articleId]: articlePicturesMarkedForDeletionForArticle(state[action.articleId], action)
      })

      case DELETE_ART_PICTURES_MARKED_FOR_DELETION_AND_CORRESPONDING_STORED_FILES:
        return Object.assign({}, _.omit(state, [action.id]))

  default:
    return state
  }
}
