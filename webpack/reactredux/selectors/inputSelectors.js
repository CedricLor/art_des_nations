/*
 * Definition of input-selectors.
 * Input-selectors should be used to abstract away the structure
 * of the store in cases where no calculations are needed
 * and memoization wouldn't provide any benefits.
 */
export const siteCurrentLocaleSelector = state => state.siteCurrentLocale

export const articlesVisibilityFilterSelector = state => state.articlesVisibilityFilter
export const articlesSelector = state => state.articles

export const articlesWIPStatesOfFieldsSelector = state => state.articlesWIPStatesOfFields
export const articlesEditStatesSelector = state => state.articlesEditStates
export const articlesNeedResizingStatesSelector = state => state.articlesNeedResizingStates
export const articlesDOMPropsSelector = state => state.articlesDOMProps

export const articlePicturesSelector = state => state.articlePictures
export const mediaContainersSelector = state => state.mediaContainers
