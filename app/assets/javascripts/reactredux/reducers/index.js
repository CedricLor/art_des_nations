import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import { isFetching } from './isFetching'
import { siteEditMode } from './site'
import { articles, newArticleFields, articlesWIPStatesOfFields, articlesEditStates } from './articles'
import { articlesNeedResizingStates, articlesDOMProps } from './articlesSizingPositionning'
import { articlesVisibilityFilter } from './articlesVisibilityFilters'

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
    articlesDOMProps
  }
)


export default rootReducer
