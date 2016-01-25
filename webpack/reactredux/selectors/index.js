import { createSelector } from 'reselect'
import { selectArticlesAndArticlePicturesOnVisibilityStatus, selectVisibleArticlesStates, selectArticlesOnLanguage, selectArticlePicturesOnLanguage } from './articlesSelects'
import { selectMediaContainersOnLanguage } from './mediaContainersSelects'

/*
 * Definition of input-selectors.
 * Input-selectors should be used to abstract away the structure
 * of the store in cases where no calculations are needed
 * and memoization wouldn't provide any benefits.
 */
const siteCurrentLocaleSelector = state => state.siteCurrentLocale

const articlesVisibilityFilterSelector = state => state.articlesVisibilityFilter
const articlesSelector = state => state.articles

const articlesWIPStatesOfFieldsSelector = state => state.articlesWIPStatesOfFields
const articlesEditStatesSelector = state => state.articlesEditStates
const articlesNeedResizingStatesSelector = state => state.articlesNeedResizingStates
const articlesDOMPropsSelector = state => state.articlesDOMProps

const articlePicturesSelector = state => state.articlePictures
const mediaContainersSelector = state => state.mediaContainers

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

const localeArticlesAndArticlePicturesSelector = createSelector(
  siteCurrentLocaleSelector,
  articlesSelector,
  articlePicturesSelector,
  (siteCurrentLocale, articles, articlePictures) => {
    // the siteCurrentLocale, articles and articlePictures params passed into this anonymous function
    // correspond to the whole state as selected in the input-selectors
    return {
      siteCurrentLocale,
      localeArticles: selectArticlesOnLanguage(articles, siteCurrentLocale),
      localeArticlePictures: selectArticlePicturesOnLanguage(articlePictures, siteCurrentLocale)
    }
  }
)



const visibleArticlesLocaleArticlePicturesSelector = createSelector(
  articlesVisibilityFilterSelector,
  localeArticlesAndArticlePicturesSelector,
  (articlesVisibilityFilter, localeArticlesArticlePicturesAndSiteCurrentLocale) => {
    return {
      siteCurrentLocale: localeArticlesArticlePicturesAndSiteCurrentLocale.siteCurrentLocale,
      articlesVisibilityFilter,
      visibleArticles: selectArticlesAndArticlePicturesOnVisibilityStatus(
        localeArticlesArticlePicturesAndSiteCurrentLocale.localeArticles,
        articlesVisibilityFilter),
      // FIXME --- At some point, will be smart to memoize pictures by visible articles
      localeArticlesArticlePictures: localeArticlesArticlePicturesAndSiteCurrentLocale.localeArticlePictures
    }
  }
)



const localeMediaContainersSelector = createSelector(
  siteCurrentLocaleSelector,
  mediaContainersSelector,
  (siteCurrentLocale, mediaContainersStates) => {
    return selectMediaContainersOnLanguage(mediaContainersStates, siteCurrentLocale)
  }
)



export const visibleArticlesAndStatesSelector = createSelector(
  visibleArticlesLocaleArticlePicturesSelector,
  articlesWIPStatesOfFieldsSelector,
  articlesEditStatesSelector,
  articlesNeedResizingStatesSelector,
  articlesDOMPropsSelector,
  localeMediaContainersSelector,
  (visibleArticlesLocaleArticlePicturesAndVisibilityFilter, articlesWIPStatesOfFields, articlesEditStates, articlesNeedResizingStates, articlesDOMProps, localeMediaContainersSates) => {
    const visibleArticleStates = selectVisibleArticlesStates(
      visibleArticlesLocaleArticlePicturesAndVisibilityFilter.visibleArticles,
      visibleArticlesLocaleArticlePicturesAndVisibilityFilter.siteCurrentLocale,
      articlesWIPStatesOfFields,
      articlesEditStates,
      articlesNeedResizingStates,
      articlesDOMProps,
      visibleArticlesLocaleArticlePicturesAndVisibilityFilter.visibleArticlesArticlePictures
    );
    return {
      articlesVisibilityFilter:           visibleArticlesLocaleArticlePicturesAndVisibilityFilter.articlesVisibilityFilter,
      visibleArticles:                    visibleArticlesLocaleArticlePicturesAndVisibilityFilter.visibleArticles,
      visibleArticlesWIPStatesOfFields:   visibleArticleStates.articlesWIPStatesOfFields,
      visibleArticlesEditStates:          visibleArticleStates.articlesEditStates,
      visibleArticlesNeedResizingStates:  visibleArticleStates.articlesNeedResizingStates,
      visibleArticlesDOMProps:            visibleArticleStates.articlesDOMProps,
      localeArticlesArticlePictures:      visibleArticlesLocaleArticlePicturesAndVisibilityFilter.localeArticlesArticlePictures,
      localeMediaContainers:              localeMediaContainersSates
    }
  }
)

