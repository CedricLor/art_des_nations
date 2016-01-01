import {
  CHANGE_NEED_RESIZING_STATE_OF_ARTICLE,
  ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
  RESET_DOM_PROPS_OF_ALL_THE_ARTICLES
} from '../constants/ActionTypes'

function changeNeedResizingStateOfArticle(id, stateValue) {
  return {
    type: CHANGE_NEED_RESIZING_STATE_OF_ARTICLE,
    id,
    stateValue
  }
}

export function assignRealDomValuesToDOMPropsOfArticle(id, posTop, divHeight, cardNumber) {
  return {
    type: ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
    id,
    posTop,
    divHeight,
    cardNumber
  }
}

function resetDOMPropsOfAllTheArticles() {
  return {
    type: RESET_DOM_PROPS_OF_ALL_THE_ARTICLES
  }
}

export function refreshArticlesSizingPositionning() {
  return function (dispatch, getState) {
    const needResizingStatesOfArticles = getState().needResizingStatesOfArticles
    _.forOwn(
      needResizingStatesOfArticles,
      [ function(value, id) { dispatch(changeNeedResizingStateOfArticle(id, true)) } ],
      [this]
      );
    dispatch(resetDOMPropsOfAllTheArticles());
  }
}
