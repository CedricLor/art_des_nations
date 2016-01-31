import {
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  LOADED_INITIAL_ARTICLES,
  LOADING_ADDITIONAL_LOCALE_ARTICLES,
  LOADED_ADDITIONNAL_LOCALE_ARTICLES,
  REORDER_ARTICLES_ARRAY,
  REORDER_ALL_THE_ARTICLES_ARRAYS
   } from '../constants/ActionTypes'
import { refreshArticlesSizingPositionning } from './articlesSizingPositionningActions';
import {
  updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle,
  successCallBackForRestoreText,
  resetAllEditAndWIPStatesForArticle,
  changeArticleEditStateOfField } from './articleFieldsActions';
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
    // It also has to run if the article fieldName has changed because if the user clicked on Save (the article)
    // the fieldName will be article and the posted_at field may have changed
    if (fieldName === "posted_at" || fieldName === "article") { dispatch(reOrderArticlesArray(locale)) };
    dispatch(refreshArticlesSizingPositionning());
  }
}

function sendUpdateByAjax(data, id, fieldName, locale) {
  /* FIXME -- This method probably does not work anymore
   1. data contains an array of article_picture_ids.
   This probably needs to be cleaned up, here or in Rails
   2. additional data should be passed to Rails (in particular, data relating to the article_pictures and
   the media_containers).
   3. This would require additional work on Rails side also (in particular, the update method in the controller and probably
   the creation of one or two additional article forms (i) one for updates from the index and (ii) one for updates from the single
   article view).
   4. respData should also probably contain data relating to article_pictures and media_containers. This additional data needs to be
   handled.
  */
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
export function getInitialDataByAjax(id, successCallBack, locale, fieldName) {
  return function (dispatch) {
    $.ajax({
      method: 'GET',
      url: `/${locale}/articles/${id}`,
      dataType: 'JSON'
    })
    .success(function(data) {
      /* successCallBack is either (i) successCallBackForCancelEditArticle or (ii) successCallBackForRestoreText (from
      from articleFieldsActions) */
      dispatch(successCallBack(data.article, locale, fieldName));
      // FIXME -- For the moment, I am only updating the article's fields which are directly related to the article
      // The same logic needs to be implemented for the article_pictures
      // and probably, media_containers, as all may change
      // To be implemented when I'll implement the update functions of the pictures both on the single article view
      // and on the article index view
    })
  }
}

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
      dispatch(getInitialDataByAjax(id, successCallBackForCancelEditArticle, locale))
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
  return function (dispatch, getState) {
    fetch(`/articles/${id}`, {
      method: 'delete',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X_CSRF_TOKEN': `${$('meta[name="csrf-token"]').attr('content')}`
      }
    })
      .then(function(response) {
          if (response.status >= 400) {
              throw new Error("Bad response from server");
          }
          return response.json();
      })
      .then(function(ancillaryItemsToDestroy) {
        dispatch(deleteArticle(id, ancillaryItemsToDestroy.article_picture_ids, ancillaryItemsToDestroy.media_container_ids));
        dispatch(reOrderAllTheArticlesArray());
        dispatch(refreshArticlesSizingPositionning());
      })
  }
}
