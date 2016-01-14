import {
  CHANGE_FIELD_OF_ARTICLE,
  CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_WIP_STATES_FOR_ARTICLE,
  CHANGE_EDIT_STATE_OF_FIELD_OF_ARTICLE,
  TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_EDIT_STATES_FOR_ARTICLE
} from '../constants/ActionTypes'


export function changeFieldOfArticle(id, fieldName, fieldValue) {
  return {
    type: CHANGE_FIELD_OF_ARTICLE,
    id,
    fieldName,
    fieldValue
  }
}


export function successCallBackForRestoreText(data, fieldName) {
  return function (dispatch) {
    dispatch(changeFieldOfArticle(data.id, fieldName, data[fieldName]));
    dispatch(resetEditAndWIPStatesForField(data.id, fieldName, false));
  }
}

import { getInitialDataByAjax } from './articlesActions'
export function handleRestoreText(id, fieldName) {
  return function(dispatch) {
    const successCallBack = successCallBackForRestoreText;
    dispatch(getInitialDataByAjax(id, successCallBack, fieldName));
  }
}


function changeWIPStateOfFieldOfArticle(id, fieldName, WIPStateValue) {
  return {
    type: CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE,
    id,
    fieldName,
    WIPStateValue
  }
}

function resetAllWIPStatesForArticle(id) {
  return {
    type: RESET_ALL_WIP_STATES_FOR_ARTICLE,
    id
  }
}


export function changeArticleEditStateOfField(id, fieldName, editStateValue) {
  return {
    type: CHANGE_EDIT_STATE_OF_FIELD_OF_ARTICLE,
    id,
    fieldName,
    editStateValue
  }
}

function resetAllEditStatesForArticle(id, resetValue) {
  return {
    type: RESET_ALL_EDIT_STATES_FOR_ARTICLE,
    id,
    resetValue
  }
}

function resetEditAndWIPStatesForField(id, fieldName, resetValue) {
  return function (dispatch) {
    dispatch(changeWIPStateOfFieldOfArticle(id, fieldName, resetValue));
    dispatch(changeArticleEditStateOfField(id, fieldName, resetValue));
  }
}

export function resetAllEditAndWIPStatesForField(id, resetValue) {
  return function (dispatch) {
    dispatch(resetAllEditStatesForArticle(id, resetValue));
    dispatch(resetAllWIPStatesForArticle(id));
  }
}

export function updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle(articleId, fieldName) {
  return function (dispatch) {
    if (fieldName == 'article') {
      dispatch(resetAllEditAndWIPStatesForField(articleId, false))
    } else {
      dispatch(resetEditAndWIPStatesForField(articleId, fieldName, false))
    }
  }
}
