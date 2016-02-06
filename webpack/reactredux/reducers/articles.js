import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  TOGGLE_SITE_EDIT_MODE,
  ADD_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  CHANGE_FIELD_OF_ARTICLE,
  CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_WIP_STATES_FOR_ARTICLE,

  CHANGE_EDIT_STATE_OF_ARTICLE,
  TURN_ON_EDIT_STATE_OF_A_FIELD,
  TURN_OFF_EDIT_STATE_OF_A_FIELD,

  TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_EDIT_STATES_FOR_ARTICLE,
  CHANGE_FIELD_OF_NEW_ARTICLE,
  RESET_FIELDS_OF_NEW_ARTICLE,
  REORDER_ARTICLES_ARRAY,
  REORDER_ALL_THE_ARTICLES_ARRAYS,
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,

  MARK_ARTICLE_PICTURE_FOR_DELETION,
  DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE,
   } from '../constants/ActionTypes';

import {
  initialStateForNewArticle,
  initialEditState,
  initialWIPState
   } from './reducersConstants';

export function newArticleFields(state = initialStateForNewArticle, action) {
  switch (action.type) {

    case CHANGE_FIELD_OF_NEW_ARTICLE:
      return Object.assign({}, state, {
        [action.fieldName]: action.value,
        hasReceivedUserInput: true
      });

    case RESET_FIELDS_OF_NEW_ARTICLE:
      return initialStateForNewArticle;

    default:
      return state;
  }
}

function articlePictureIds(state = [], action) {
  switch (action.type) {
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
      return [
        ...state,
        action.articlePictureId
      ]

    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return _.without(state, action.articlePictureId);

    default:
      return state;
  }
}

function article(state, action) {
  switch (action.type) {

    case ADD_NEW_ARTICLE:
      return {
        id: action.article.id,
        title: action.article.title,
        teaser: action.article.teaser,
        body: action.article.body,
        status: action.article.status,
        posted_at: action.article.posted_at,
        article_picture_ids: action.article.article_picture_ids
      }

    case UPDATE_ARTICLE:
      if (state.id !== action.article.id) {
        return state
      }
      return Object.assign({}, state, {
        title: action.article.title,
        teaser: action.article.teaser,
        body: action.article.body,
        status: action.article.status,
        posted_at: action.article.posted_at,
        article_picture_ids: action.article.article_picture_ids
      })

    case CHANGE_FIELD_OF_ARTICLE:
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        [action.fieldName]: action.fieldValue
      });

    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      if (state.id !== action.articleId) {
        return state;
      }
      return Object.assign({}, state, {
        article_picture_ids: articlePictureIds(state.article_picture_ids, action)
      });

    default:
      return state;
  }
}

function localizedArticles(state = [], action) {
  switch (action.type) {

    case ADD_NEW_ARTICLE:
      return [
        article({}, action),
        ...state
      ];

    case DELETE_ARTICLE:
      const index = _.findIndex(state, {id: action.id});
      return [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ];

    case UPDATE_ARTICLE:
    case CHANGE_FIELD_OF_ARTICLE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return state.map(art => article(art, action));

    default:
      return state;
  }
}

export function articles(state = {}, action) {
  switch (action.type) {


    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articles;

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articles);

    case ADD_NEW_ARTICLE:
    case DELETE_ARTICLE:
      const newStateIterated = {};
      _.forOwn(state, (localeArticlesArray, locale) => newStateIterated[locale] = localizedArticles(state[locale], action) );
      return Object.assign({}, state, newStateIterated);

    case UPDATE_ARTICLE:
    case CHANGE_FIELD_OF_ARTICLE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return Object.assign({}, state, {
        [action.locale]: localizedArticles(state[action.locale], action)
      });

    case REORDER_ARTICLES_ARRAY:
      // Reorder only the articles' array for the current locale
      // FIXME - TESTME - The method applied here is likely to delete the entire state for the non-current locale
      const localizedReorderedState = {};
      localizedReorderedState[action.locale] = _.orderBy(state[action.locale], 'posted_at', 'desc');
      return Object.assign({}, state, localizedReorderedState)


    case REORDER_ALL_THE_ARTICLES_ARRAYS:
      // Reorder all the articles' arrays, in all the locales
      // FIXME - TESTME - The method applied here is likely to delete the entire state for the non-current locale
      const reOrderedState = {};
      _.forOwn(state, (localeArticlesArray, locale) => {
        reOrderedState[locale] = _.orderBy(localeArticlesArray, 'posted_at', 'desc')
      })
      return reOrderedState

    default:
      return state
  }
}




export function articlesEditStates(state = {}, action) {
  const new_state = Object.assign({}, state);
  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesEditStates

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesEditStates)

    case ADD_NEW_ARTICLE:
      _.forOwn(new_state, (localeEditStatesArray, locale) => {
        new_state[locale][action.article.id] = initialEditState
      })
      return new_state

    /* ***************** */
    case TURN_ON_EDIT_STATE_OF_A_FIELD:
      new_state[action.locale][action.id]["article"] = true;
      new_state[action.locale][action.id][action.fieldName] = true;
      return new_state

    case TURN_OFF_EDIT_STATE_OF_A_FIELD:
      new_state[action.locale][action.id][action.fieldName] = false;
      if ( !( _.includes( _.values( _.omit(new_state[action.locale][action.id], ['article']) ), true ) ) ) {
        new_state[action.locale][action.id]["article"] = false;
      }
      return new_state
    /* ***************** */

    case TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE:
      new_state[action.id][action.fieldName] = !new_state[action.id][action.fieldName];
      return new_state

    case RESET_ALL_EDIT_STATES_FOR_ARTICLE:
      _.forOwn(new_state[action.locale][action.id], (value, fieldName) => {
        // if (fieldName === 'article' || fieldName === 'title' || fieldName === 'teaser' || fieldName === 'body') {
        new_state[action.locale][action.id][fieldName] = action.resetValue;
        // }
      })
      return new_state

    case DELETE_ARTICLE:
      _.forOwn(new_state, (localeEditStatesArray, locale) => {
        delete new_state[locale][action.id];
      })
      return new_state

    default:
      return state
  }
}



export function articlesWIPStatesOfFields(state = {}, action) {
  const new_state = Object.assign({}, state);
  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesWIPStatesOfFields

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesWIPStatesOfFields)

    case ADD_NEW_ARTICLE:
      _.forOwn(new_state, (localeWIPStatesArray, locale) => {
        new_state[locale][action.article.id] = initialWIPState
      })
      return new_state

    case CHANGE_FIELD_OF_ARTICLE:
      new_state[action.locale][action.id][action.fieldName] = true
      return new_state

    case CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE:
      new_state[action.locale][action.id][action.fieldName] = action.WIPStateValue;
      return new_state

    case RESET_ALL_WIP_STATES_FOR_ARTICLE:
      _.forOwn(new_state[action.locale][action.id], (value, fieldName) => {
        // if (fieldName === 'title' || fieldName === 'teaser' || fieldName === 'body') {
          new_state[action.locale][action.id][fieldName] = false;
        // }
      })
      return new_state

    case DELETE_ARTICLE:
      _.forOwn(new_state, (localeWIPStatesArray, locale) => {
        delete new_state[locale][action.id];
      })
      return new_state

    default:
      return state
  }
}
