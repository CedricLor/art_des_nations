import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONNAL_LOCALE_ARTICLES,
  CHANGE_NEED_RESIZING_STATE_OF_ARTICLE,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
  ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
  RESET_DOM_PROPS_OF_ALL_THE_ARTICLES
   } from '../constants/ActionTypes';

import { equalizePreviousRowIfFirstCardOfNextRow } from './helpersForArticlesSizingPositionning';
import { initialArticlesDOMPropsState } from './reducersConstants';


export function articlesNeedResizingStates(state = {}, action) {
  const new_state = Object.assign({}, state);

  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesNeedResizingStates

    case LOADED_ADDITIONNAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesNeedResizingStates)

    case ADD_NEW_ARTICLE:
      new_state[action.locale][action.article.id] = true;
      return new_state

    case CHANGE_NEED_RESIZING_STATE_OF_ARTICLE:
      new_state[action.locale][action.id] = action.stateValue;
      return new_state

    case DELETE_ARTICLE:
      _.forOwn(new_state, (localeNeedResizingStatesObjects, locale) => {
        delete new_state[locale][action.id];
      })
      return new_state

    default:
      return state
  }
}

export function articlesDOMProps(state = {}, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesDOMProps

    case LOADED_ADDITIONNAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesDOMProps)

    case ADD_NEW_ARTICLE:
      _.forOwn(new_state, (localeArticleDOMPropsObjects, locale) => {
        // Create the record for the new article in all the localized versions of articlesDOMProps state
        new_state[locale][action.article.id] = initialArticlesDOMPropsState
        // increment cardnumbers of all the articles in all the localized versions of articlesDOMProps state
        let i = 1;
        new_state = _.forOwn(new_state, function(domPropsObjects) {
          domPropsObjects.cardNumber = i;
          i++;
        });
        // end increment
      });
      return new_state

    case DELETE_ARTICLE:
      _.forOwn(new_state, (localeArticleDOMPropsObjects, locale) => {
        delete new_state[locale][action.id];
      })
      return new_state

    case ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE:
      new_state[action.locale][action.id] = {
        posTop:     action.posTop,
        divHeight:  action.divHeight,
        cardNumber: action.cardNumber
      };
      new_state = equalizePreviousRowIfFirstCardOfNextRow(new_state, action)
      return new_state

    case RESET_DOM_PROPS_OF_ALL_THE_ARTICLES:
      const localizedDOMPropsAfterChanges = {};
      localizedDOMPropsAfterChanges[action.locale] = _.forOwn(state[action.locale], (domPropsObjects, id) => { id: initialArticlesDOMPropsState });
      return Object.assign({}, state, localizedDOMPropsAfterChanges)

    default:
      return state
  }
}
