import {
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
  ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE,
} from '../constants/ActionTypes'

export function storedFiles(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
      const newStoredFile = {}
      newStoredFile[action.storedFileId] = action.file
      return Object.assign({}, state, newStoredFile)

    case DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
      const newStateAfterDeletionOfStoredFile = Object.assign({}, state)
      delete newStateAfterDeletionOfStoredFile[action.storedFileId]
      return newStateAfterDeletionOfStoredFile

    default:
      return state
  }
}
