import {
  CHANGE_NEED_RESIZING_STATE_OF_ARTICLE,
  ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
  RESET_DOM_PROPS_OF_ALL_THE_ARTICLES
} from '../constants/ActionTypes'

function changeArticleNeedResizingState(id, stateValue, locale) {
  return {
    type: CHANGE_NEED_RESIZING_STATE_OF_ARTICLE,
    id,
    stateValue,
    locale
  }
}

export function assignRealDomValuesToDOMPropsOfArticle(id, posTop, divHeight, cardNumber, locale) {
  return {
    type: ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
    id,
    posTop,
    divHeight,
    cardNumber,
    locale
  }
}

function resetDOMPropsOfAllTheArticles(locale) {
  return {
    type: RESET_DOM_PROPS_OF_ALL_THE_ARTICLES,
    locale
  }
}

export function refreshArticlesSizingPositionning(locale) {
  return function (dispatch, getState) {
    const localizedArticlesNeedResizingStates = getState().articlesNeedResizingStates[locale]
    _.forOwn(
      localizedArticlesNeedResizingStates,
      [ function(value, id) { dispatch(changeArticleNeedResizingState(id, true, locale)) } ],
      [this]
      );
    dispatch(resetDOMPropsOfAllTheArticles(locale));
  }
}
