import { ADD_NEW_ARTICLE, CHANGE_FIELD_OF_NEW_ARTICLE, RESET_FIELDS_OF_NEW_ARTICLE } from '../constants/ActionTypes'
import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';
import { setArticlesVisibilityFilter } from './articlesVisibilityFilterActions';

require('es6-promise').polyfill();
require('isomorphic-fetch');

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

function preProcessorForHandleSubmitNewArticle(getState) {
  const data = new FormData();
  data.append('authenticity_token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
  data.append('media_file', getState().newArticleFields.card_picture);
  const articleFields = getState().newArticleFields;
  articleFields["card_picture"] = {};
  data.append('article_form', JSON.stringify(articleFields));
  return data
}

export function handleSubmitNewArticle(locale) {
  return function (dispatch, getState) {
    const data = preProcessorForHandleSubmitNewArticle(getState);

    fetch(`/${locale}/articles`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X_CSRF_TOKEN': `${$('meta[name="csrf-token"]').attr('content')}`
      },
      body: data
    })
      .then((response) => {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then((articleWithPicturesAndMediaContainers) => {
        dispatch(addNewArticle(articleWithPicturesAndMediaContainers));
        dispatch(pushPath(`/${locale}/article/${articleWithPicturesAndMediaContainers.article.id}`))
        dispatch(resetNewArticleFields());
        dispatch(setArticlesVisibilityFilter('SHOW_DRAFT'));
        dispatch(refreshArticlesSizingPositionning());
      })
  }
}
