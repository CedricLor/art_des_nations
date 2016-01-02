import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import { isFetching } from './isFetching'
import { siteEditMode } from './site'
import { articles, newArticleFields, articlesWIPStatesOfFields, articlesEditStates } from './articles'
import { needResizingStatesOfArticles, articlesDOMProps } from './articlesSizingPositionning'

const rootReducer = combineReducers(
  {
    routing: routeReducer,
    isFetching,
    siteEditMode,
    articles,
    newArticleFields,
    articlesWIPStatesOfFields,
    articlesEditStates,
    needResizingStatesOfArticles,
    articlesDOMProps
  }
)

export default rootReducer
