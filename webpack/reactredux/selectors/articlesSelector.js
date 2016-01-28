import { createSelector } from 'reselect'
import { selectArticlesOnVisibilityStatus, selectVisibleArticlesStates, selectArticlesOnLanguage } from './articlesSelects'

import {
  siteCurrentLocaleSelector,
  articlesVisibilityFilterSelector,
  articlesSelector,
  articlesWIPStatesOfFieldsSelector,
  articlesEditStatesSelector,
  articlesNeedResizingStatesSelector,
  articlesDOMPropsSelector,
  } from './inputSelectors'

/*
 * Definition of combined-selector.
 * In combined-selector, input-selectors are combined to derive new
 * information. To prevent expensive recalculation of the input-selectors
 * memoization is applied. Hence, these selectors are only recomputed when the
 * value of their input-selectors change. If none of the input-selectors return
 * a new value, the previously computed value is returned.
 *********************************************************
 ********* README ****************************************
 *********************************************************
 * IMPORTANT: In combined selectors, the parameters passed to the callback correspond to the values
 * returned by the input-selectors (or parent-selectors) tested previously, in the same order.
 * So: below, the articles
 */

const localeArticlesSelector = createSelector(
  siteCurrentLocaleSelector,
  articlesSelector,
  (siteCurrentLocale, articles) => {
    return {
      siteCurrentLocale,
      localeArticles: selectArticlesOnLanguage(articles, siteCurrentLocale)
    }
  }
)


const visibleArticlesLocaleAndVisibilityFilterSelector = createSelector(
  articlesVisibilityFilterSelector,
  localeArticlesSelector,
  (articlesVisibilityFilter, localeArticlesAndSiteCurrentLocale) => {
    return {
      siteCurrentLocale: localeArticlesAndSiteCurrentLocale.siteCurrentLocale,
      articlesVisibilityFilter,
      visibleArticles: selectArticlesOnVisibilityStatus(
        localeArticlesAndSiteCurrentLocale.localeArticles,
        articlesVisibilityFilter)
    }
  }
)


const visibleArticlesAndStatesSelector = createSelector(
  visibleArticlesLocaleAndVisibilityFilterSelector,
  articlesWIPStatesOfFieldsSelector,
  articlesEditStatesSelector,
  articlesNeedResizingStatesSelector,
  articlesDOMPropsSelector,
  (visibleArticlesLocaleAndVisibilityFilter, articlesWIPStatesOfFields, articlesEditStates, articlesNeedResizingStates, articlesDOMProps) => {

    const visibleArticleStates = selectVisibleArticlesStates(
      visibleArticlesLocaleAndVisibilityFilter.visibleArticles,
      visibleArticlesLocaleAndVisibilityFilter.siteCurrentLocale,
      articlesWIPStatesOfFields,
      articlesEditStates,
      articlesNeedResizingStates,
      articlesDOMProps
    );
    return {
      articlesVisibilityFilter:           visibleArticlesLocaleAndVisibilityFilter.articlesVisibilityFilter,
      visibleArticles:                    visibleArticlesLocaleAndVisibilityFilter.visibleArticles,
      visibleArticlesWIPStatesOfFields:   visibleArticleStates.articlesWIPStatesOfFields,
      visibleArticlesEditStates:          visibleArticleStates.articlesEditStates,
      visibleArticlesNeedResizingStates:  visibleArticleStates.articlesNeedResizingStates,
      visibleArticlesDOMProps:            visibleArticleStates.articlesDOMProps
    }
  }
)

export default visibleArticlesAndStatesSelector
