import {
  CHANGE_NEED_RESIZING_STATE_OF_ARTICLES,
  ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE,
  RESET_DOM_PROPS_OF_ALL_THE_ARTICLES
} from '../constants/ActionTypes'

function changeArticlesNeedResizingStates(stateValue) {
  return {
    type: CHANGE_NEED_RESIZING_STATE_OF_ARTICLES,
    stateValue,
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

// This function is called in three cases:
// (i) upon adding a new article;
// (ii) upon updating a given article;
// (iii) upon resizing the window (see component did mount in NewsIndexPage);
// (iv) it should probably also be called upon deleting an article.
// What it should do:
export function refreshArticlesSizingPositionning() {
  return function (dispatch) {
    // 1. reset the need resizing property of all the articles to true
    dispatch(changeArticlesNeedResizingStates(true));
  }
}
