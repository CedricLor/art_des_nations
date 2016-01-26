import { ADD_NEW_ARTICLE, CHANGE_FIELD_OF_NEW_ARTICLE, RESET_FIELDS_OF_NEW_ARTICLE } from '../constants/ActionTypes'
import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';

require('es6-promise').polyfill();
require('isomorphic-fetch');

function addNewArticle(articleWithPicturesAndMediaContainers, locale) {
  return {
    type: ADD_NEW_ARTICLE,
    article: articleWithPicturesAndMediaContainers.article,
    articlePicture: articleWithPicturesAndMediaContainers.article_pictures[0],
    mediaContainer: articleWithPicturesAndMediaContainers.media_containers[0],
    locale
  }
}

export function changeNewArticleFields(fieldName, text) {
  return {
    type: CHANGE_FIELD_OF_NEW_ARTICLE,
    fieldName,
    text
  }
}

export function resetNewArticleFields() {
  return {
    type: RESET_FIELDS_OF_NEW_ARTICLE
  }
}

export function handleSubmitNewArticle(locale) {
  return function (dispatch, getState) {
    const data = new FormData();
    // FIXME -- Push the reading into the dom of the authenticity token and the media_file back to the React components
    // This should not be in the actions
    data.append('authenticity_token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
    data.append('article_form', JSON.stringify(getState().newArticleFields));
    data.append('media_file', document.querySelector('input[type="file"]').files[0]);

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
      .then((article) => {
        dispatch(addNewArticle(article, locale));
        dispatch(refreshArticlesSizingPositionning(locale));
        dispatch(resetNewArticleFields());
      })

  }
}
