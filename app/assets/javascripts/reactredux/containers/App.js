import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {NewsIndexPage} from '../components/NewsIndexPage'
// window.NewsIndexPage = require('../components/NewsIndexPage').NewsIndexPage

import * as ArticlesActions from '../actions/articlesActions'
import * as ArticlesFieldsActions from '../actions/articleFieldsActions'
import * as ArticlesSizingPositionningActions from '../actions/articlesSizingPositionningActions'
import * as NewArticleActions from '../actions/newArticleActions'
import * as SiteActions from '../actions/siteActions'

console.log(NewsIndexPage);

function mapStateToProps(state) {
  return {
    routing:                      state.routing,
    isFetching:                   state.isFetching,
    siteEditMode:                 state.siteEditMode,
    articles:                     state.articles,
    newArticleFields:             state.newArticleFields,
    articlesWIPStatesOfFields:    state.articlesWIPStatesOfFields,
    articlesEditStates:           state.articlesEditStates,
    needResizingStatesOfArticles: state.needResizingStatesOfArticles,
    articlesDOMProps:             state.articlesDOMProps
  }
}


function mapDispatchToProps(dispatch) {
  return {
    articlesActions:                   bindActionCreators(ArticlesActions, dispatch),
    articlesFieldsActions:             bindActionCreators(ArticlesFieldsActions, dispatch),
    articlesSizingPositionningActions: bindActionCreators(ArticlesSizingPositionningActions, dispatch),
    newArticleActions:                 bindActionCreators(NewArticleActions, dispatch),
    siteActions:                       bindActionCreators(SiteActions, dispatch)
  }
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NewsIndexPage)
