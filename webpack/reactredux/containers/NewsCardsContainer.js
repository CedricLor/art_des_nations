import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewsCardsComponent } from '../components/news_index_page/news_cards_component'

import * as NewArticleActions from '../actions/newArticleActions'

import {visibleArticlesAndStatesSelector} from '../selectors/index'

function mapStateToProps(state, ownProps) {
  const memoizedFilteredArticles = visibleArticlesAndStatesSelector(state);

  return {
    // Site global props: passed in down from App/PageIndexView
    siteCurrentLocale:          ownProps.siteCurrentLocale,
    siteEditMode:               ownProps.siteEditMode,
    // Articles list specific props: passed in down from App/PageIndexView
    // Check whether it wouldn't be smarter to apply the reselect from here
    articles:                   memoizedFilteredArticles.visibleArticles,

    articlesWIPStatesOfFields:  memoizedFilteredArticles.visibleArticlesWIPStatesOfFields,
    articlesEditStates:         memoizedFilteredArticles.visibleArticlesEditStates,
    articlesNeedResizingStates: memoizedFilteredArticles.visibleArticlesNeedResizingStates,
    articlesDOMProps:           memoizedFilteredArticles.visibleArticlesDOMProps,
    // Somehow specific (bootstrap CSS classes)
    articlesPassedInUiProps:    ownProps.articlesPassedInUiProps,
    // Ancillary items: from own props (because filtered by language in App/reselect)
    articlePictures:            ownProps.articlePictures,
    mediaContainers:            ownProps.mediaContainers,
    // For the new article form
    newArticleFields:           state.newArticleFields,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    articlesActions:                   ownProps.articlesActions,
    articlesFieldsActions:             ownProps.articlesFieldsActions,
    articlesSizingPositionningActions: ownProps.articlesSizingPositionningActions,

    newArticleActions:                 bindActionCreators(NewArticleActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsCardsComponent)
