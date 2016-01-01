import { combineReducers } from 'redux'
import { isFetching } from './isFetching'
import { siteEditMode } from './site'
import { articles, newArticleFields, articlesWIPStatesOfFields, articlesEditStates } from './articles'
import { needResizingStatesOfArticles, articlesDOMProps } from './articlesSizingPositionning'

const rootReducer = combineReducers(
  {
    siteEditMode,
    isFetching,
    articles,
    newArticleFields,
    articlesWIPStatesOfFields,
    articlesEditStates,
    needResizingStatesOfArticles,
    articlesDOMProps
  }
)

export default rootReducer
