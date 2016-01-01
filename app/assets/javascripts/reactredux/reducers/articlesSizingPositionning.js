import {
  LOAD_INITIAL_DATA,
  CHANGE_NEED_RESIZING_STATE_OF_ARTICLE,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
  ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
  RESET_DOM_PROPS_OF_ALL_THE_ARTICLES
   } from '../constants/ActionTypes';

import { equalizePreviousRowIfFirstCardOfNextRow } from './helpersForArticlesSizingPositionning';
import { initialArticlesDOMPropsState } from './reducersConstants';


export function needResizingStatesOfArticles(state = {}, action) {
  const new_state = Object.assign({}, state);

  switch (action.type) {

    case LOAD_INITIAL_DATA:
      return action.initialState.needResizingStatesOfArticles

    case CHANGE_NEED_RESIZING_STATE_OF_ARTICLE:
    case ADD_NEW_ARTICLE:
      new_state[action.id] = action.stateValue;
      return new_state

    case DELETE_ARTICLE:
      delete new_state[action.id];
      return new_state

    default:
      return state
  }
}

export function articlesDOMProps(state = {}, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {

    case LOAD_INITIAL_DATA:
      return action.initialState.articlesDOMProps

    case ADD_NEW_ARTICLE:
      new_state[action.id] = initialArticlesDOMPropsState
      // increment cardnumbers of all the articles
      let i = 1;
      new_state = _.forOwn(new_state, function(value) {
        value.cardNumber = i;
        i++;
      });
      // end increment
      return new_state

    case DELETE_ARTICLE:
      delete new_state[action.id];
      return new_state

    case ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE:
      new_state[action.id] = {
        posTop:     action.posTop,
        divHeight:  action.divHeight,
        cardNumber: action.cardNumber
      };
      new_state = equalizePreviousRowIfFirstCardOfNextRow(new_state, action)
      return new_state

    case RESET_DOM_PROPS_OF_ALL_THE_ARTICLES:
      _.forOwn(new_state, function(value, key) { key: initialArticlesDOMPropsState });
      return new_state

    default:
      return state
  }
}
