import {
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
  ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
} from '../constants/ActionTypes'

export function storedFiles(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
      const newStoredFile = {}
      newStoredFile[action.storedFileId] = action.file
      return Object.assign({}, state, newStoredFile)

    default:
      return state
  }
}
