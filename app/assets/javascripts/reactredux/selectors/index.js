import { createSelector } from 'reselect'
import { selectArticles, selectVisibleArticlesStates } from './articlesSelects'

/*
 * Definition of input-selectors.
 * Input-selectors should be used to abstract away the structure
 * of the store in cases where no calculations are needed
 * and memoization wouldn't provide any benefits.
 */
const articlesVisibilityFilterSelector = state => state.articlesVisibilityFilter
const articlesSelector = state => state.articles

const articlesWIPStatesOfFieldsSelector = state => state.articlesWIPStatesOfFields
const articlesEditStatesSelector = state => state.articlesEditStates
const articlesNeedResizingStatesSelector = state => state.articlesNeedResizingStates
const articlesDOMPropsSelector = state => state.articlesDOMProps

/*
 * Definition of combined-selector.
 * In combined-selector, input-selectors are combined to derive new
 * information. To prevent expensive recalculation of the input-selectors
 * memoization is applied. Hence, these selectors are only recomputed when the
 * value of their input-selectors change. If none of the input-selectors return
 * a new value, the previously computed value is returned.
 */
const visibleArticlesSelector = createSelector(
  articlesVisibilityFilterSelector,
  articlesSelector,
  (articlesVisibilityFilter, articles) => {
    return {
      articlesVisibilityFilter,
      visibleArticles: selectArticles(articles, articlesVisibilityFilter)
    }
  }
)

export const visibleArticlesAndStatesSelector = createSelector(
  visibleArticlesSelector,
  articlesWIPStatesOfFieldsSelector,
  articlesEditStatesSelector,
  articlesNeedResizingStatesSelector,
  articlesDOMPropsSelector,
  (visibleArticlesAndVisibilityFilter, articlesWIPStatesOfFields, articlesEditStates, articlesNeedResizingStates, articlesDOMProps) => {
    const visibleArticleStates = selectVisibleArticlesStates(
      visibleArticlesAndVisibilityFilter.visibleArticles,
      articlesWIPStatesOfFields,
      articlesEditStates,
      articlesNeedResizingStates,
      articlesDOMProps
    );
    return {
      articlesVisibilityFilter:           visibleArticlesAndVisibilityFilter.articlesVisibilityFilter,
      visibleArticles:                    visibleArticlesAndVisibilityFilter.visibleArticles,
      visibleArticlesWIPStatesOfFields:   visibleArticleStates.articlesWIPStatesOfFields,
      visibleArticlesEditStates:          visibleArticleStates.articlesEditStates,
      visibleArticlesNeedResizingStates:  visibleArticleStates.articlesNeedResizingStates,
      visibleArticlesDOMProps:            visibleArticleStates.articlesDOMProps
    }
  }
)

