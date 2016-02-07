import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
  ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE,
  MARK_ARTICLE_PICTURE_FOR_DELETION,
  UPDATE_ARTICLE,
} from '../constants/ActionTypes';

import {normalize} from '../stores/storeCreationHelpers'

function articlePicture(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
      return Object.assign({}, state, {
        for_carousel:   action.forCarousel,
        for_card:       action.forCard,
        stored_file_id: action.storedFileId
      })

    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
      return Object.assign({}, state, {
        for_card: action.forCard,
        for_carousel: action.forCarousel,
        id: action.articlePictureId,
        media_container_id: undefined,
        stored_file_id: action.storedFileId,
      })

    case DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE:
      return {
        for_card: state.for_card,
        for_carousel: state.for_carousel,
        id: state.id,
        media_container_id: state.media_container_id
      }

    default:
      return state
  }
}

function localizedArticlePictures(state = {}, action) {
  switch (action.type) {

    case ADD_NEW_ARTICLE:
      return Object.assign({}, state, {
        [action.articlePicture.id]: action.articlePicture
      });

    case DELETE_ARTICLE:
      return Object.assign({}, _.omit(state, action.articlePictureIds));

    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE:
      return Object.assign({}, state, {
        [action.articlePictureId]: articlePicture(state[action.articlePictureId], action)
      });

    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return Object.assign({}, _.omit(state, [action.articlePictureId]));

    case UPDATE_ARTICLE:
      return Object.assign({}, state, normalize(action.articlePictures));

    default:
      return state;
  }
}

export function articlePictures(state = {}, action) {
  switch (action.type) {
    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlePictures

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlePictures)

    case ADD_NEW_ARTICLE:
    case DELETE_ARTICLE:
      const newState = {};
      _.forOwn(state, (localeArticlePicturesObjects, locale) => newState[locale] = localizedArticlePictures(state[locale], action));
      return Object.assign({}, state, newState);

    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
    case UPDATE_ARTICLE:
      return Object.assign({}, state, {
        [action.locale]: localizedArticlePictures(state[action.locale], action)
      });

    default:
      return state;
  }
}
