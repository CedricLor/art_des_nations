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
  CHANGE_EDIT_STATE_OF_FIELD_OF_ARTICLE,
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
      const localizedReorderedState = {};
      localizedReorderedState[action.locale] = _.sortByOrder(state[action.locale], 'posted_at', 'desc');
      return Object.assign({}, state, localizedReorderedState)

    case REORDER_ALL_THE_ARTICLES_ARRAYS:
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

    case CHANGE_EDIT_STATE_OF_FIELD_OF_ARTICLE:

      // if changing the edit state of the article, change the edit state of all the fields
      if ( action.fieldName === "article" ) {
        _.forOwn(new_state[action.locale][action.id], (value, fieldName) => { new_state[action.locale][action.id][fieldName] = action.editStateValue });
      // else change only the edit state of the relevant field
      } else {
        new_state[action.locale][action.id][action.fieldName] = action.editStateValue;
      }

      // if any of the edit state of the field is true, set the article edit state to true
      // 1. Create a copy of the current article's edit states
      const statesOfFieldsExceptArticleState = Object.assign({}, new_state[action.locale][action.id]);
      // 2. Delete the edit state of the article to keep only the fields edit states
      delete statesOfFieldsExceptArticleState.article;
      // 3. Loop around the values of the states of the fields, and if any edit state is on
      // turn the article's edit state to true
      if ( _.includes( _.values( statesOfFieldsExceptArticleState ), true ) ) {
        new_state[action.locale][action.id].article = true;
      // 4. Else, turn it to false (it means nothing is currently in edit mode in this article)
      } else {
        new_state[action.locale][action.id].article = false;
      }
      return new_state

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
