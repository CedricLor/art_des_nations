import {
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
  ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE,
  DELETE_ART_PICTURES_MARKED_FOR_DELETION_AND_CORRESPONDING_STORED_FILES,
} from '../constants/ActionTypes'

function byArticleId(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
      return Object.assign({}, state, {
        [action.storedFileId]: action.file
      });

    case DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
      return Object.assign({}, _.omit(state, [action.storedFileId]));

    default:
      return state
  }
}

export function storedFiles(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
      return Object.assign({}, state, {
        [action.articleId]: byArticleId(state[action.articleId], action)
      });

    case DELETE_ART_PICTURES_MARKED_FOR_DELETION_AND_CORRESPONDING_STORED_FILES:
      return Object.assign({}, _.omit(state, [action.id]));

    default:
      return state
  }
}
