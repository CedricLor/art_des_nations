// Import action constant
import {
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  LOADED_INITIAL_ARTICLES,
  LOADING_ADDITIONAL_LOCALE_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  REORDER_ARTICLES_ARRAY,
  REORDER_ALL_THE_ARTICLES_ARRAYS
   } from '../constants/ActionTypes'

// Import action creators from other actions creators modules
import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';
import {
  updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle,
  successCallBackForRestoreText,
  resetAllEditAndWIPStatesForArticle,
  changeArticleEditStateOfField } from './articleFieldsActions';
import { createArticleStates } from '../stores/storeCreationHelpers'

// Import API calls
import {
  fetchArticles,
  fetchUpdateArticle,
  fetchInitialArticle,
  fetchDeleteArticle, /* note the singular form of article (diff with fetchInitialArticles (plural) which is here below */
  } from '../api/articles.js'

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
    fetchArticles(dispatch, locale, dispatchLoadInitialArticles);
  }
}

// Loading additional articles
function dispatchLoadAdditionalLocaleArticles(jsonFetchedArticles, locale) {
  const additionalStates = createArticleStates(jsonFetchedArticles, locale);
  return {
    type: LOADED_ADDITIONAL_LOCALE_ARTICLES,
    additionalStates
  }
}

function dispatchLoadingAdditionalLocaleArticles() {
  return {
    type: LOADING_ADDITIONAL_LOCALE_ARTICLES
  }
}

export function fetchAdditionalLocaleArticles(locale) {
  return function(dispatch) {
    fetchArticles(dispatch, locale, dispatchLoadAdditionalLocaleArticles)
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
    // It also has to run if the article fieldName has changed because if the user clicked on Save (the article)
    // the fieldName will be article and the posted_at field may have changed
    if (fieldName === "posted_at" || fieldName === "article") { dispatch(reOrderArticlesArray(locale)) };
    dispatch(refreshArticlesSizingPositionning());
  }
}

export function handleUpdateArticle(id, fieldName, locale) {
  return function (dispatch, getState) {
    const articles = getState().articles[locale]
    let data = _.omit( _.find( articles, { 'id': id } ), ['created_at', 'updated_at'] );
    if (fieldName != 'article') {
      data = _.pick(data, fieldName);
    }
    fetchUpdateArticle(
      dispatch,
      getState,
      data,
      id,
      fieldName,
      locale,
      [updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle, updateArticleAndRefresh]
    );
  }
}

// Methods for cancel edit
function successCallBackForCancelEditArticle(data, locale) {
  return function (dispatch) {
    dispatch(resetAllEditAndWIPStatesForArticle(data.id, false, locale));
    dispatch(updateArticleAndRefresh(data, locale));
  }
}

export function handleCancelEditArticle(id, locale) {
  return function (dispatch, getState) {
    const WIPStates = getState().articlesWIPStatesOfFields[locale][id]
    if (_.includes(_.values(WIPStates), true)) {
      fetchInitialArticle(dispatch, id, successCallBackForCancelEditArticle, locale, fieldName)
    } else {
      dispatch(changeArticleEditStateOfField(id, 'article', false, locale));
    }
  }
}

// Methods for delete article
function deleteArticle(id, articlePictureIds, mediaContainerIds) {
  return {
    type: DELETE_ARTICLE,
    id,
    articlePictureIds,
    mediaContainerIds
  }
}

function reOrderAllTheArticlesArray() {
  return {
    type: REORDER_ALL_THE_ARTICLES_ARRAYS
  }
}

export function handleDeleteArticle(id) {
  return function (dispatch) {
    fetchDeleteArticle(dispatch, id, deleteArticle, reOrderAllTheArticlesArray, refreshArticlesSizingPositionning)
  }
}
