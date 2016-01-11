import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import { isFetching } from './isFetching'
import { siteEditMode } from './site'

import { articles, newArticleFields, articlesWIPStatesOfFields, articlesEditStates } from './articles'
import { articlesNeedResizingStates, articlesDOMProps } from './articlesSizingPositionning'
import { articlesVisibilityFilter } from './articlesVisibilityFilters'

import { languageSwitcher } from './languageSwitcher'
import { availableLocales } from './availableLocales'

const rootReducer = combineReducers(
  {
    routing: routeReducer,
    isFetching,
    siteEditMode,

    newArticleFields,

    articlesVisibilityFilter,
    articles,
    articlesWIPStatesOfFields,
    articlesEditStates,
    articlesNeedResizingStates,
    articlesDOMProps,

    languageSwitcher,
    availableLocales
  }
)


export default rootReducer
