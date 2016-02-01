import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  CHANGE_NEED_RESIZING_STATE_OF_ARTICLES,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
  ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
   } from '../constants/ActionTypes';

import { equalizePreviousRowIfFirstCardOfNextRow } from './helpersForArticlesSizingPositionning';
import { initialArticlesDOMPropsState } from './reducersConstants';


export function articlesNeedResizingStates(state = {}, action) {
  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesNeedResizingStates

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesNeedResizingStates)

    // In case we add a new article, we need to create a new entry for the article in all the existing langugages
    case ADD_NEW_ARTICLE:
      const newState = Object.assign({}, state);
      _.forOwn(newState, (localeNeedResizingStatesObjects, locale) => {newState[locale][action.article.id] = true});
      return newState

    case DELETE_ARTICLE:
      const newStateWithDeletedArticle = Object.assign({}, state);
      _.forOwn(newStateWithDeletedArticle, (localeNeedResizingStatesObjects, locale) => {delete newStateWithDeletedArticle[locale][action.id]})
      return newStateWithDeletedArticle

    // Sets all the needResizingStates values of all the articles in all the languages to true
    case CHANGE_NEED_RESIZING_STATE_OF_ARTICLES:
      const newStateWithNeedResizing = Object.assign({}, state);
      _.forOwn(newStateWithNeedResizing, (localeNeedResizingStatesObjects, locale) => {
        _.forOwn(newStateWithNeedResizing[locale], (needResizingStatesByArticlesById, keyId) => {
          newStateWithNeedResizing[locale][keyId] = true;
        })
      })
      return newStateWithNeedResizing

    case ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE:
      const newStateWithRealDomValue = Object.assign({}, state);
      newStateWithRealDomValue[action.locale][action.id] = false;
      return newStateWithRealDomValue

    default:
      return state
  }
}

export function articlesDOMProps(state = {}, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesDOMProps

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesDOMProps)

    // Create the record for the new article in all the localized versions of articlesDOMProps state
    case ADD_NEW_ARTICLE:
      _.forOwn(new_state, (localeArticleDOMPropsObjects, locale) => {new_state[locale][action.article.id] = initialArticlesDOMPropsState});
      return new_state

    case DELETE_ARTICLE:
      _.forOwn(new_state, (localeArticleDOMPropsObjects, locale) => {delete new_state[locale][action.id]})
      return new_state

    case ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE:
      new_state[action.locale][action.id] = {
        posTop:     action.posTop,
        divHeight:  action.divHeight,
        cardNumber: action.cardNumber
      };
      new_state = equalizePreviousRowIfFirstCardOfNextRow(new_state, action)
      return new_state

    default:
      return state
  }
}
