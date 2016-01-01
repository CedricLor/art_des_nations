import {
  LOAD_INITIAL_DATA,
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
  RESET_FIELDS_OF_NEW_ARTICLE } from '../constants/ActionTypes'

import {
  initialStateForNewArticle,
  initialEditState,
  initialWIPState
   } from './reducersConstants'

export function newArticleFields(state = initialStateForNewArticle, action) {
  switch (action.type) {

    case CHANGE_FIELD_OF_NEW_ARTICLE:
      let new_state = Object.assign({}, state);
      new_state[action.fieldName] = action.text;
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
        id: action.id,
        title: action.title,
        teaser: action.teaser,
        body: action.body,
        created_at: action.created_at,
        updated_at: action.updated_at
      }

    case UPDATE_ARTICLE:
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {
        title: action.title,
        teaser: action.teaser,
        body: action.body,
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

export function articles(state = [], action) {
  switch (action.type) {

    case LOAD_INITIAL_DATA:
      return action.initialState.articles

    case ADD_NEW_ARTICLE:
      return [
        article(undefined, action),
        ...state
      ]

    case UPDATE_ARTICLE:
      return state.map(art =>
        article(art, action)
      )

    case CHANGE_FIELD_OF_ARTICLE:
      return state.map(art =>
        article(art, action)
      )

    case DELETE_ARTICLE:
      let index = _.findIndex(state, {id: action.id});
      return [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ]

    default:
      return state
  }
}

export function articlesEditStates(state = {}, action) {
  const new_state = Object.assign({}, state);
  switch (action.type) {

    case LOAD_INITIAL_DATA:
      return action.initialState.articlesEditStates

    case ADD_NEW_ARTICLE:
      new_state[action.id] = initialEditState
      return new_state

    case CHANGE_EDIT_STATE_OF_FIELD_OF_ARTICLE:
      // if changing the edit state of the article, change the edit state of all the fields
      if ( action.fieldName === "article" ) {
        _.forOwn(new_state[action.id], function(value, fieldName) { new_state[action.id][fieldName] = action.editStateValue });
      // else change only the edit state of the relevant field
      } else {
        new_state[action.id][action.fieldName] = action.editStateValue;
      }
      // if any of the edit state of the field is true, set the article edit state to true
      // 1. Create a copy of the current article's edit states
      const statesOfFieldsExceptArticleState = Object.assign({}, new_state[action.id]);
      // 2. Delete the edit state of the article to keep only the fields edit states
      delete statesOfFieldsExceptArticleState.article;
      // QUICKFIX!!!! FIXME!!!
      delete statesOfFieldsExceptArticleState.body;
      // 3. Loop around the values of the states of the fields, and if any edit state is on
      // turn the article's edit state to true
      if ( _.includes( _.values( statesOfFieldsExceptArticleState ), true ) ) {
        new_state[action.id].article = true;
      // 4. Else, turn it to false (it means nothing is currently in edit mode in this article)
      } else {
        new_state[action.id].article = false;
      }
      return new_state

    case TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE:
      new_state[action.id][action.fieldName] = !new_state[action.id][action.fieldName];
      return new_state

    case RESET_ALL_EDIT_STATES_FOR_ARTICLE:
      _.forOwn(new_state[action.id], function(value, fieldName){
        // if (fieldName === 'article' || fieldName === 'title' || fieldName === 'teaser' || fieldName === 'body') {
          new_state[action.id][fieldName] = action.resetValue;
        // }
      })
      return new_state

    case DELETE_ARTICLE:
      delete new_state[action.id];
      return new_state

    default:
      return state
  }
}

export function articlesWIPStatesOfFields(state = {}, action) {
  const new_state = Object.assign({}, state);
  switch (action.type) {

    case LOAD_INITIAL_DATA:
      return action.initialState.articlesWIPStatesOfFields

    case ADD_NEW_ARTICLE:
      new_state[action.id] = initialWIPState
      return new_state

    case CHANGE_FIELD_OF_ARTICLE:
      new_state[action.id][action.fieldName] = true
      return new_state

    case CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE:
      new_state[action.id][action.fieldName] = action.WIPStateValue;
      return new_state

    case RESET_ALL_WIP_STATES_FOR_ARTICLE:
      _.forOwn(new_state[action.id], function(value, fieldName){
        // if (fieldName === 'title' || fieldName === 'teaser' || fieldName === 'body') {
          new_state[action.id][fieldName] = false;
        // }
      })
      return new_state

    case DELETE_ARTICLE:
      delete new_state[action.id];
      return new_state

    default:
      return state
  }
}
