import { UPDATE_ARTICLE, DELETE_ARTICLE, LOAD_INITIAL_DATA, LOADED_INITIAL_DATA } from '../constants/ActionTypes'
import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';
import { updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle, successCallBackForRestoreText, resetAllEditAndWIPStatesForField, changeArticleEditStateOfField } from './articleFieldsActions';
import { createInitialState } from '../stores/storeCreationHelpers'

function loadInitialData(initialState) {
  return {
    type: LOAD_INITIAL_DATA,
    initialState
  }
}

function dispatchLoadedInitialData() {
  return {
    type: LOADED_INITIAL_DATA
  }
}

export function initialDataReceived(jsonFetchedArticles) {
  const initialState = createInitialState(jsonFetchedArticles);
  return function (dispatch) {
    dispatch(loadInitialData(initialState));
    dispatch(dispatchLoadedInitialData());
  }
}

function updateArticle({id, title, body, teaser, status, posted_at, created_at, updated_at}) {
  return {
    type: UPDATE_ARTICLE,
    id,
    title,
    body,
    teaser,
    status,
    posted_at,
    created_at,
    updated_at
  }
}

function updateArticleAndRefresh(data) {
  return function (dispatch) {
    dispatch(updateArticle(data));
    dispatch(refreshArticlesSizingPositionning());
  }
}

function sendUpdateByAjax(data, id, fieldName) {
  return function (dispatch) {
    $.ajax({
      method: 'PUT',
      url: "/articles/" + id,
      dataType: 'JSON',
      data: {
        article: data
      },
      success: (function(respData) {
        dispatch(updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle(id, fieldName));
        dispatch(updateArticleAndRefresh(respData));
      })
    });
  }
}

export function handleUpdateArticle(id, fieldName) {
  return function (dispatch, getState) {
    let data = _.omit( _.find( getState().articles, { 'id': id } ), ['created_at', 'updated_at'] );
    if (fieldName != 'article') {
      data = _.pick(data, fieldName);
    }
    dispatch(sendUpdateByAjax(data, id, fieldName));
  }
}

// Methods for cancel edit
export function getInitialDataByAjax(id, successCallBack, fieldName) {
  return function (dispatch) {
    $.ajax({
      method: 'GET',
      url: "/articles/" + id,
      dataType: 'JSON',
      success: (function(_this) {
        return function(data) {
          dispatch(successCallBack(data, fieldName));
        };
      })(this)
    });
  }
}

function successCallBackForCancelEditArticle(data) {
  return function (dispatch) {
    dispatch(resetAllEditAndWIPStatesForField(data.id, false));
    dispatch(updateArticleAndRefresh(data));
  }
}

export function handleCancelEditArticle(id) {
  return function (dispatch, getState) {
    const WIPStates = getState().articlesWIPStatesOfFields[id]
    if (_.includes(_.values(WIPStates), true)) {
      dispatch(getInitialDataByAjax(id, successCallBackForCancelEditArticle, null))
    } else {
      dispatch(changeArticleEditStateOfField(id, 'article', false));
    }
  }
}

// Methods for delete article
function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    id
  }
}

export function handleDeleteArticle(id) {
  return function (dispatch) {
    $.ajax({
      method: 'DELETE',
      url: "/articles/" + id,
      dataType: 'JSON',
      success: (function() {
        dispatch(deleteArticle(id));
      })
    });
  }
}
