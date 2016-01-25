import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import { isFetching } from './isFetching'
import { siteEditMode, siteCurrentLocale, siteAvailableLocales, siteLanguageSwitcherText } from './site'

import { articles, newArticleFields, articlesWIPStatesOfFields, articlesEditStates } from './articles'
import { articlesNeedResizingStates, articlesDOMProps } from './articlesSizingPositionning'
import { articlesVisibilityFilter } from './articlesVisibilityFilters'

import { mediaContainers } from './mediaContainers'
import { articlePictures } from './articlePictures'

const rootReducer = combineReducers(
  {
    routing: routeReducer,
    isFetching,
    siteEditMode,
    siteCurrentLocale,
    siteAvailableLocales,
    siteLanguageSwitcherText,

    newArticleFields,

    articlesVisibilityFilter,
    articles,
    articlesWIPStatesOfFields,
    articlesEditStates,
    articlesNeedResizingStates,
    articlesDOMProps,

    mediaContainers,
    articlePictures
  }
)


export default rootReducer
