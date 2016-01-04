import { ADD_NEW_ARTICLE, CHANGE_FIELD_OF_NEW_ARTICLE, RESET_FIELDS_OF_NEW_ARTICLE } from '../constants/ActionTypes'

export function addNewArticle({id, title, teaser, body, created_at, updated_at}) {
  return {
    type: ADD_NEW_ARTICLE,
    id,
    title,
    teaser,
    body,
    created_at,
    updated_at
  }
}

export function changeNewArticleFields(fieldName, text) {
  return {
    type: CHANGE_FIELD_OF_NEW_ARTICLE,
    fieldName,
    text
  }
}

function resetNewArticleFields() {
  return {
    type: RESET_FIELDS_OF_NEW_ARTICLE
  }
}

import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';
export function handleSubmitNewArticle() {
  return function (dispatch, getState) {
    $.post(
      '/articles',
      { article: getState().newArticleFields },
      (function(_this) {
        return function(data) {
          dispatch(addNewArticle(data));
          dispatch(refreshArticlesSizingPositionning());
          dispatch(resetNewArticleFields());
        };
      })(this),
      'JSON'
    );
  }
}
