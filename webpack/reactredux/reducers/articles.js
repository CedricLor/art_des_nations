import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONNAL_LOCALE_ARTICLES,
  TOGGLE_SITE_EDIT_MODE,
  ADD_NEW_ARTICLE,
  UPDATE_ARTICLE,
  REQUEST_UPDATE_ARTICLE,
  RECEIVE_UPDATED_ARTICLE,
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
  REORDER_ALL_THE_ARTICLES_ARRAYS } from '../constants/ActionTypes'

import {
  initialStateForNewArticle,
  initialEditState,
  initialWIPState
   } from './reducersConstants'

export function newArticleFields(state = initialStateForNewArticle, action) {
  switch (action.type) {

    case CHANGE_FIELD_OF_NEW_ARTICLE:
      let new_state = Object.assign({}, state);
      new_state[action.fieldName] = action.value;
      new_state.hasReceivedUserInput = true;
      return new_state

    case RESET_FIELDS_OF_NEW_ARTICLE:
      return initialStateForNewArticle
    default:
      return state
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
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        title: action.title,
        teaser: action.teaser,
        body: action.body,
        status: action.status,
        posted_at: action.posted_at,
        created_at: action.created_at,
        updated_at: action.updated_at
      })

    case CHANGE_FIELD_OF_ARTICLE:
      if (state.id !== action.id) {
        return state
      }
      let new_state = Object.assign({}, state);
      new_state[action.fieldName] = action.fieldValue;
      return new_state

    case DELETE_ARTICLE:
      if (state.id !== action.id) {
        return state
      }

    default:
      return state
  }
}

export function articles(state = {}, action) {
  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articles

    case LOADED_ADDITIONNAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articles)

    case ADD_NEW_ARTICLE:
      const newStateWithNewArticle = {};
      _.forOwn(state, (localeArticlesArray, locale) => {
        newStateWithNewArticle[locale] = [
          article({}, action),
          ...state[locale]
        ];
      })
      return newStateWithNewArticle

    case UPDATE_ARTICLE:
    case CHANGE_FIELD_OF_ARTICLE:
      const localizedArticleStateAfterChanges = {};
      localizedArticleStateAfterChanges[action.locale] = state[action.locale].map(art =>
        article(art, action));
      return Object.assign({}, state, localizedArticleStateAfterChanges)

    case DELETE_ARTICLE:
      const newState = {};
      _.forOwn(state, (localeArticlesArray, locale) => {
        let index = _.findIndex(state[locale], {id: action.id});
        newState[locale] = [
          ...state[locale].slice(0, index),
          ...state[locale].slice(index+1)
        ]
      })
      return newState

    case REORDER_ARTICLES_ARRAY:
      // Reorder only the articles' array for the current locale
      const localizedReorderedState = {};
      localizedReorderedState[action.locale] = _.sortByOrder(state[action.locale], 'posted_at', 'desc');
      return Object.assign({}, state, localizedReorderedState)

    case REORDER_ALL_THE_ARTICLES_ARRAYS:
    // Reorder all the articles' arrays, in all the locales
      const reOrderedState = {};
      _.forOwn(state, (localeArticlesArray, locale) => {
        reOrderedState[locale] = _.sortByOrder(localeArticlesArray, 'posted_at', 'desc')
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

    case LOADED_ADDITIONNAL_LOCALE_ARTICLES:
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

    case LOADED_ADDITIONNAL_LOCALE_ARTICLES:
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
