// Import action constant
import {
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  LOADED_INITIAL_ARTICLES,
  LOADING_ADDITIONAL_LOCALE_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  REORDER_ARTICLES_ARRAY,
  REORDER_ALL_THE_ARTICLES_ARRAYS,
} from '../constants/ActionTypes'

// Import action creators from other actions creators modules
import {refreshArticlesSizingPositionning} from './articlesSizingPositionningActions';
import {
  updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle,
  successCallBackForRestoreText,
  resetAllEditAndWIPStatesForArticle,
  changeArticleEditStateOfField,
} from './articleFieldsActions';
import {deleteArticlePicturesMarkedForDeletionAndCorrespondingStoredFilesForArticleWithId} from './articlePicturesActions';

import {createArticleStates} from '../stores/storeCreationHelpers';

// Import API calls
import {
  fetchArticles,
  fetchUpdateArticle,
  fetchInitialArticle,
  fetchDeleteArticle, /* note the singular form of article (diff with fetchInitialArticles (plural) which is here below */
  } from '../api/articles.js'

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

function updateArticle(articleWithPicturesAndMediaContainers, locale) {
  // data received from the API: {article: Object, media_containers: Array[4], article_pictures: Array[4]}
  // FIXME - The API should also return information on deleted mediaContainers
  return {
    type: UPDATE_ARTICLE,
    article: articleWithPicturesAndMediaContainers.article, /* article_picture_ids: Array[4], body: null, id: 74, posted_at: "2016-02-05T19:49:46.439Z", status: "draft", teaser: "Test", title: "Testing" */
    articlePictures: articleWithPicturesAndMediaContainers.article_pictures, /* Array[4]: [{for_card: "true", for_carousel: "true", id: 73, media_container_id: 85}, ...] */
    mediaContainers: articleWithPicturesAndMediaContainers.media_containers, /* Array[4]: [{id: 85, media: "http://locomotive-test-cedric.s3.amazonaws.com/development/media_containers/media/000/000/085/original/china_5_reduced.jpg?1454701835", media_content_type: "image/jpeg", media_file_name: "china_5_reduced.jpg", media_file_size: 23970, title: "Testing"}, ...] */
    locale
  }
}


function updateArticleAndRefresh(data, locale, fieldName) {
  return function (dispatch) {
    dispatch(updateArticle(data, locale));
    // If the field posted_at has changed, reorder the articles' array
    // It also has to run if the article fieldName has changed because if the user clicked on Save (the article)
    // the fieldName will be article and the posted_at field may have changed
    if (fieldName === "article" || fieldName === "posted_at") { dispatch(reOrderArticlesArray(locale)) };
    dispatch(refreshArticlesSizingPositionning());
  }
}

function callBacksForHandleUpdateArticle(respData, id, fieldName, locale) {
  return function (dispatch) {
    dispatch(updateArticleAndRefresh(respData, locale, fieldName));
    dispatch(updateEditAndWIPStatesOnDBUpdateOfFieldOrArticle(id, fieldName, locale));
    dispatch(deleteArticlePicturesMarkedForDeletionAndCorrespondingStoredFilesForArticleWithId(id));
  }
}

export function handleUpdateArticle(id, fieldName, locale) {
  /* Use cases:
  (i) the user has clicked on the big save button above the article on the article index view or the single article view
  (ii) the user has clicked on the small save button aside an editable form field
  */
  return function (dispatch, getState) {
    // call the API
    fetchUpdateArticle(
      dispatch,
      getState,
      id,
      fieldName,
      locale,
      callBacksForHandleUpdateArticle
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
    // fetchDeleteArticle(dispatch, id, deleteArticle, refreshArticlesSizingPositionning)
  }
}
