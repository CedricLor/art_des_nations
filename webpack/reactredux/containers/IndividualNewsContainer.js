import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IndividualNewsComponent } from '../components/news_index_page/individual_news_component'

function mapStateToProps(state, ownProps) {
  return {
    // Site global props: passed in down from App/PageIndexView
    siteCurrentLocale:          ownProps.siteCurrentLocale,
    siteEditMode:               ownProps.siteEditMode,
    // Article specific props: selected from the store
    currentArticle:             _.find(state.articles[`${state.siteCurrentLocale}`], { 'id': parseInt(ownProps.params.id)}),
    articlesWIPStatesOfFields:  state.articlesWIPStatesOfFields[`${state.siteCurrentLocale}`][`${ownProps.params.id}`],
    articlesEditStates:         state.articlesEditStates[`${state.siteCurrentLocale}`][`${ownProps.params.id}`],
    articlesDOMProps:           state.articlesDOMProps[`${state.siteCurrentLocale}`][`${ownProps.params.id}`],
    // Ancillary items: from own props (because filtered by language in App/reselect)
    articlePictures:            ownProps.articlePictures,
    mediaContainers:            ownProps.mediaContainers,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    articlesActions:        bindActionCreators(ownProps.articlesActions, dispatch),
    articlesFieldsActions:  bindActionCreators(ownProps.articlesFieldsActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualNewsComponent)
