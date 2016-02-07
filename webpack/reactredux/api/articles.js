require('es6-promise').polyfill();
require('isomorphic-fetch');


import {
  preProcessorForFetchUpdateArticle,
  preProcessorForHandleSubmitNewArticle
} from './articlesHelpers'


export function fetchArticles(dispatch, locale, callback) {
  fetch(`/${locale}/articles`)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(articles) {
      dispatch(callback(articles, locale));
    })
}




export function fetchUpdateArticle(dispatch, getState, id, fieldName, locale, callBacksForHandleUpdateArticle) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const formData = preProcessorForFetchUpdateArticle(getState, locale, id);

  // This only works in Firefox 44
  // console.log('$$$$$$$$$$$$$$$$$$$$$');
  // for(var pair of formData.entries()) {
  //    console.log(pair[0]+ ', '+ pair[1]);
  // }

  fetch(`/${locale}/articles/${id}`, {
      method: 'put',
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X_CSRF_TOKEN': `${csrfToken}`
      },
      body: formData
  })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(respData) {
      dispatch(callBacksForHandleUpdateArticle(respData, id, fieldName, locale));
    })
}




export function fetchInitialArticle(dispatch, id, successCallBack, locale, fieldName) {
  fetch(`/${locale}/articles/${id}`)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(data) {
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

export function fetchDeleteArticle(dispatch, id, deleteArticle, reOrderAllTheArticlesArray, refreshArticlesSizingPositionning) {
  fetch(`/articles/${id}`, {
    method: 'delete',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X_CSRF_TOKEN': `${document.querySelector('meta[name="csrf-token"]').getAttribute('content')}`
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




export function fetchSubmitNewArticle(dispatch, getState, locale, callbacks) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  const data = preProcessorForHandleSubmitNewArticle(getState);

  fetch(`/${locale}/articles`, {
    method: 'post',
    credentials: 'same-origin',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X_CSRF_TOKEN': `${csrfToken}`
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
      /* callbacks are defined in ../actions/newArticleActions.js
      const callbacks = [
        addNewArticle,
        pushPath,
        resetNewArticleFields,
        setArticlesVisibilityFilter,
        refreshArticlesSizingPositionning
      ];
      */
      dispatch(callbacks[0](articleWithPicturesAndMediaContainers));
      dispatch(callbacks[1](`/${locale}/article/${articleWithPicturesAndMediaContainers.article.id}`))
      dispatch(callbacks[2]());
      dispatch(callbacks[3]('SHOW_DRAFT'));
      dispatch(callbacks[4]());
    })
}
