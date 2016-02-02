import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewsIndexPage } from '../components/NewsIndexPage'

import * as ArticlesActions from '../actions/articlesActions'
import * as ArticlesFieldsActions from '../actions/articleFieldsActions'
import * as ArticlesSizingPositionningActions from '../actions/articlesSizingPositionningActions'
import * as ArticlesVisibilityFilterActions from '../actions/articlesVisibilityFilterActions'
import * as ArticlePicturesActions from '../actions/articlePicturesActions'
import * as SiteActions from '../actions/siteActions'

import { localeArticlePicturesSelector, localeMediaContainersSelector } from '../selectors/index'

function mapStateToProps(state) {
  return {
    routing:                         state.routing,
    isFetching:                      state.isFetching,
    siteEditMode:                    state.siteEditMode,
    siteAvailableLocales:            state.siteAvailableLocales,
    siteLanguageSwitcherText:        state.siteLanguageSwitcherText,
    siteCurrentLocale:               state.siteCurrentLocale,

    articlesVisibilityFilter:        state.articlesVisibilityFilter,

    articlePictures:                 localeArticlePicturesSelector(state),
    mediaContainers:                 localeMediaContainersSelector(state),
  }
}


function mapDispatchToProps(dispatch) {
  return {
    articlesActions:                   bindActionCreators(ArticlesActions, dispatch),
    articlesFieldsActions:             bindActionCreators(ArticlesFieldsActions, dispatch),
    articlesSizingPositionningActions: bindActionCreators(ArticlesSizingPositionningActions, dispatch),
    articlesVisibilityFilterActions:   bindActionCreators(ArticlesVisibilityFilterActions, dispatch),
    articlePicturesActions:            bindActionCreators(ArticlePicturesActions, dispatch),
    siteActions:                       bindActionCreators(SiteActions, dispatch)
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NewsIndexPage)
