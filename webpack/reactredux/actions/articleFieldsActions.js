import {
  CHANGE_FIELD_OF_ARTICLE,
  CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_WIP_STATES_FOR_ARTICLE,

  CHANGE_EDIT_STATE_OF_ARTICLE,
  TURN_ON_EDIT_STATE_OF_A_FIELD,
  TURN_OFF_EDIT_STATE_OF_A_FIELD,

  TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_EDIT_STATES_FOR_ARTICLE
} from '../constants/ActionTypes'

export function changeFieldOfArticle(id, fieldName, fieldValue, locale) {
  return {
    type: CHANGE_FIELD_OF_ARTICLE,
    id,
    fieldName,
    fieldValue,
    locale
  }
}


export function successCallBackForRestoreText(data, locale, fieldName) {
  return function (dispatch) {
    dispatch(changeFieldOfArticle(data.id, fieldName, data[fieldName], locale));
    dispatch(resetEditAndWIPStatesForField(data.id, fieldName, false, locale));
  }
}

import { getInitialDataByAjax } from './articlesActions'
export function handleRestoreText(id, fieldName, locale) {
  return function(dispatch) {
    const successCallBack = successCallBackForRestoreText;
    dispatch(getInitialDataByAjax(id, successCallBack, fieldName, locale));
  }
}


function changeWIPStateOfFieldOfArticle(id, fieldName, WIPStateValue, locale) {
  return {
    type: CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE,
    id,
    fieldName,
    WIPStateValue,
    locale
  }
}

function resetAllWIPStatesForArticle(id, locale) {
  return {
    type: RESET_ALL_WIP_STATES_FOR_ARTICLE,
    id,
    locale
  }
}

/* ************************** */
function turnOnEditStateOfAField(id, fieldName, locale) {
  return {
    type: TURN_ON_EDIT_STATE_OF_A_FIELD,
    id,
    fieldName,
    locale
  }
}

function turnOffEditStateOfAField(id, fieldName, locale) {
  return {
    type: TURN_OFF_EDIT_STATE_OF_A_FIELD,
    id,
    fieldName,
    locale
  }
}


export function changeArticleEditStateOfField(id, fieldName, editStateValue, locale) {
  return function (dispatch) {
    if ( fieldName === "article" ) {
        dispatch(resetAllEditStatesForArticle(id, editStateValue, locale))
    } else {
      const fnToDispatch = ( editStateValue === true ) ? turnOnEditStateOfAField : turnOffEditStateOfAField
      dispatch(fnToDispatch(id, fieldName, locale))
    }
  }
}
/* ************************** */


function resetAllEditStatesForArticle(id, resetValue, locale) {
  return {
    type: RESET_ALL_EDIT_STATES_FOR_ARTICLE,
    id,
    resetValue,
    locale
  }
}

function resetEditAndWIPStatesForField(id, fieldName, resetValue, locale) {
  return function (dispatch) {
    dispatch(changeWIPStateOfFieldOfArticle(id, fieldName, resetValue, locale));
    dispatch(changeArticleEditStateOfField(id, fieldName, resetValue, locale));
  }
}

export function resetAllEditAndWIPStatesForField(id, resetValue, locale) {
  return function (dispatch) {
    dispatch(resetAllEditStatesForArticle(id, resetValue, locale));
    dispatch(resetAllWIPStatesForArticle(id, locale));
  }
}

export function updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle(articleId, fieldName, locale) {
  return function (dispatch) {
    if (fieldName == 'article') {
      dispatch(resetAllEditAndWIPStatesForField(articleId, false, locale))
    } else {
      dispatch(resetEditAndWIPStatesForField(articleId, fieldName, false, locale))
    }
  }
}
