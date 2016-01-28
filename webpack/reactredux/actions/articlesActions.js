import { UPDATE_ARTICLE, DELETE_ARTICLE, LOADED_INITIAL_ARTICLES, LOADING_ADDITIONAL_LOCALE_ARTICLES, LOADED_ADDITIONNAL_LOCALE_ARTICLES, REORDER_ARTICLES_ARRAY, REORDER_ALL_THE_ARTICLES_ARRAYS } from '../constants/ActionTypes'
import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';
import { updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle, successCallBackForRestoreText, resetAllEditAndWIPStatesForField, changeArticleEditStateOfField } from './articleFieldsActions';
import { createArticleStates } from '../stores/storeCreationHelpers'

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Loading initial articles
function dispatchLoadInitialArticles(jsonFetchedArticlesAndEmbeddedData, locale) {
  const initialState = createArticleStates(jsonFetchedArticlesAndEmbeddedData, locale);
  return {
    type: LOADED_INITIAL_ARTICLES,
    initialState
  }
}

export function fetchInitialArticles(locale) {
  return function(dispatch) {
    fetch(`/${locale}/articles`)
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(articles) {
        dispatch(dispatchLoadInitialArticles(articles, locale));
      })
  }
}

// Loading additional articles
function dispatchLoadAdditionalLocaleArticles(jsonFetchedArticles, locale) {
  const additionalStates = createArticleStates(jsonFetchedArticles, locale);
  return {
    type: LOADED_ADDITIONNAL_LOCALE_ARTICLES,
    additionalStates
  }
}

function dispatchLoadingAdditionalLocaleArticles() {
  return {
    type: LOADING_ADDITIONAL_LOCALE_ARTICLES
  }
}

export function fetchAdditionalLocaleArticles(locale) {
  return function (dispatch) {
    dispatch(dispatchLoadingAdditionalLocaleArticles());
    $.ajax({
      method: "GET",
      url: `/${locale}/articles`,
      dataType: 'JSON'
      })
      .success(function(data) {
        dispatch(dispatchLoadAdditionalLocaleArticles(data, locale));
    });
  }
}
// Methods for update article (and fields)
function reOrderArticlesArray(locale) {
  return {
    type: REORDER_ARTICLES_ARRAY,
    locale
  }
}

function updateArticle({id, title, body, teaser, status, posted_at, created_at, updated_at}, locale) {
  return {
    type: UPDATE_ARTICLE,
    id,
    title,
    body,
    teaser,
    status,
    posted_at,
    created_at,
    updated_at,
    locale
  }
}

function updateArticleAndRefresh(data, locale, fieldName) {
  return function (dispatch) {
    dispatch(updateArticle(data, locale));
    // If the field posted_at has changed, reorder the articles' array
    // FIXME -- Why does it also have to run if the article has changed???
    if (fieldName === "posted_at" || fieldName === "article") { dispatch(reOrderArticlesArray(locale)) };
    dispatch(refreshArticlesSizingPositionning());
  }
}

function sendUpdateByAjax(data, id, fieldName, locale) {
  return function (dispatch) {
    $.ajax({
      method: 'PUT',
      url: `/${locale}/articles/${id}`,
      dataType: 'JSON',
      data: { article: data },
      success: (function(respData) {
        dispatch(updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle(id, fieldName, locale));
        dispatch(updateArticleAndRefresh(respData, locale, fieldName));
      })
    });
  }
}

export function handleUpdateArticle(id, fieldName, locale) {
  return function (dispatch, getState) {
    const articles = getState().articles[locale]
    let data = _.omit( _.find( articles, { 'id': id } ), ['created_at', 'updated_at'] );
    if (fieldName != 'article') {
      data = _.pick(data, fieldName);
    }
    dispatch(sendUpdateByAjax(data, id, fieldName, locale));
  }
}

// Methods for cancel edit
export function getInitialDataByAjax(id, successCallBack, fieldName, locale) {
  return function (dispatch) {
    $.ajax({
      method: 'GET',
      url: `/${locale}/articles/${id}`,
      dataType: 'JSON',
      success: (function(_this) {
        return function(data) {
          dispatch(successCallBack(data, locale, fieldName));
        };
      })(this)
    });
  }
}

function successCallBackForCancelEditArticle(data, locale) {
  return function (dispatch) {
    dispatch(resetAllEditAndWIPStatesForField(data.id, false, locale));
    dispatch(updateArticleAndRefresh(data, locale));
  }
}

export function handleCancelEditArticle(id, locale) {
  return function (dispatch, getState) {
    const WIPStates = getState().articlesWIPStatesOfFields[locale][id]
    if (_.includes(_.values(WIPStates), true)) {
      dispatch(getInitialDataByAjax(id, successCallBackForCancelEditArticle, null, locale))
    } else {
      dispatch(changeArticleEditStateOfField(id, 'article', false, locale));
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

function reOrderAllTheArticlesArray() {
  return {
    type: REORDER_ALL_THE_ARTICLES_ARRAYS
  }
}

export function handleDeleteArticle(id) {
  return function (dispatch, getState) {
    $.ajax({
      method: 'DELETE',
      url: "/articles/" + id,
      dataType: 'JSON',
      success: (function() {
        dispatch(deleteArticle(id));
        dispatch(reOrderAllTheArticlesArray());
        dispatch(refreshArticlesSizingPositionning());
      })
    });
  }
}
