import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewsIndexPage } from '../components/NewsIndexPage'

import * as ArticlesActions from '../actions/articlesActions'
import * as ArticlesFieldsActions from '../actions/articleFieldsActions'
import * as ArticlesSizingPositionningActions from '../actions/articlesSizingPositionningActions'
import * as ArticlesVisibilityFilterActions from '../actions/articlesVisibilityFilterActions'
import * as NewArticleActions from '../actions/newArticleActions'
import * as SiteActions from '../actions/siteActions'

import { ArticlesVisibilityFilters } from '../constants/ActionTypes.js'

function mapStateToProps(state) {
  return {
    routing:                         state.routing,
    isFetching:                      state.isFetching,
    siteEditMode:                    state.siteEditMode,
    articlesVisibilityFilter:        state.articlesVisibilityFilter,
    articles:                        selectArticles(state.articles, state.articlesVisibilityFilter),
    newArticleFields:                state.newArticleFields,
    articlesWIPStatesOfFields:       state.articlesWIPStatesOfFields,
    articlesEditStates:              state.articlesEditStates,
    needResizingStatesOfArticles:    state.needResizingStatesOfArticles,
    articlesDOMProps:                state.articlesDOMProps
  }
}


function mapDispatchToProps(dispatch) {
  return {
    articlesActions:                   bindActionCreators(ArticlesActions, dispatch),
    articlesFieldsActions:             bindActionCreators(ArticlesFieldsActions, dispatch),
    articlesSizingPositionningActions: bindActionCreators(ArticlesSizingPositionningActions, dispatch),
    articlesVisibilityFilterActions:   bindActionCreators(ArticlesVisibilityFilterActions, dispatch),
    newArticleActions:                 bindActionCreators(NewArticleActions, dispatch),
    siteActions:                       bindActionCreators(SiteActions, dispatch)
  }
}

// FIXME: (i) use reselect and (ii) make selections on the associated articles states
// Note: use https://github.com/faassen/reselect for better performance.
function selectArticles(articles, filter) {
  switch (filter) {
    case ArticlesVisibilityFilters.SHOW_ALL:
      return articles
    case ArticlesVisibilityFilters.SHOW_DRAFT:
      return articles.filter(article => article.status === "draft")
    case ArticlesVisibilityFilters.SHOW_PUBLISHED:
      return articles.filter(article => article.status === "published" || article.status === "featured")
    case ArticlesVisibilityFilters.SHOW_FEATURED:
      return articles.filter(article => article.status === "featured")
    case ArticlesVisibilityFilters.SHOW_ARCHIVED:
      return articles.filter(article => article.status === "archived")
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NewsIndexPage)
