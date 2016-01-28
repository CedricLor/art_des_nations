import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IndividualNewsComponent } from '../components/news_index_page/individual_news_component'

function mapStateToProps(state, ownProps) {
  const currentArticle = _.find(state.articles[`${state.siteCurrentLocale}`], { 'id': parseInt(ownProps.params.id)});
  // QUICK FIX - AT A LATER STAGE, DISPATCH MEDIA_CONTAINER BETWEEN CAROUSEL MEDIA CONTAINERS AND OTHERS
  const [articlePictures, mediaContainers] = [[], []];
  _.forEach(currentArticle.article_picture_ids, (picture_id) => {
    console.log("----------------------------------")
    console.log(ownProps.articlePictures[picture_id])
    console.log(ownProps.mediaContainers[ownProps.articlePictures[picture_id]["media_container_id"]])
    articlePictures.push(ownProps.articlePictures[picture_id]);
    mediaContainers.push(ownProps.mediaContainers[ownProps.articlePictures[picture_id]["media_container_id"]]);
  });

  return {
    // Site global props: passed in down from App/PageIndexView
    siteCurrentLocale:          ownProps.siteCurrentLocale,
    siteEditMode:               ownProps.siteEditMode,
    // Article specific props: selected from the store
    currentArticle:             currentArticle,
    articlesWIPStatesOfFields:  state.articlesWIPStatesOfFields[`${state.siteCurrentLocale}`][`${ownProps.params.id}`],
    articlesEditStates:         state.articlesEditStates[`${state.siteCurrentLocale}`][`${ownProps.params.id}`],
    articlesDOMProps:           state.articlesDOMProps[`${state.siteCurrentLocale}`][`${ownProps.params.id}`],
    // Ancillary items: from own props (because filtered by language in App/reselect)
    articlePictures:            articlePictures,
    mediaContainers:            mediaContainers,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    articlesActions:        ownProps.articlesActions,
    articlesFieldsActions:  ownProps.articlesFieldsActions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualNewsComponent)
