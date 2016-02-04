// Import action constants
import { ADD_NEW_ARTICLE, CHANGE_FIELD_OF_NEW_ARTICLE, RESET_FIELDS_OF_NEW_ARTICLE } from '../constants/ActionTypes'

// Import action creators from other action modules
import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';
import { setArticlesVisibilityFilter } from './articlesVisibilityFilterActions';

// Import api calls
import {fetchSubmitNewArticle} from '../api/articles'

// FIXME - When updating from redux-simple-router 1.0.2 to react-router-redux (v. 2)
// this import should change to
// import {routeActions} from 'react-router-redux'
// The whole redux-router integration stack will then need to be reworked on
// pushPath will then be available from routeActions
import { pushPath } from 'redux-simple-router'

function addNewArticle(articleWithPicturesAndMediaContainers) {
  return {
    type: ADD_NEW_ARTICLE,
    article: articleWithPicturesAndMediaContainers.article,
    articlePicture: articleWithPicturesAndMediaContainers.article_pictures[0],
    mediaContainer: articleWithPicturesAndMediaContainers.media_containers[0]
  }
}

export function changeNewArticleFields(fieldName, value) {
  return {
    type: CHANGE_FIELD_OF_NEW_ARTICLE,
    fieldName,
    value
  }
}

export function resetNewArticleFields() {
  return {
    type: RESET_FIELDS_OF_NEW_ARTICLE
  }
}

export function handleSubmitNewArticle(locale) {
  return function (dispatch, getState) {
    const callbacks = [
      addNewArticle,
      pushPath,
      resetNewArticleFields,
      setArticlesVisibilityFilter,
      refreshArticlesSizingPositionning
    ];
    fetchSubmitNewArticle(dispatch, getState, locale, callbacks);
  }
}
