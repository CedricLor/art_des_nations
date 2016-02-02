import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IndividualNewsComponent } from '../components/news_index_page/individual_news_component'

function mapStateToProps(state, ownProps) {
  const currentArticle = _.find(state.articles[`${state.siteCurrentLocale}`], { 'id': parseInt(ownProps.params.id)});
  const [articlePictures, mediaContainers] = [[], {}];
  if (currentArticle.article_picture_ids.length > 0 &&
      _.size(ownProps.articlePictures) > 0 &&
      _.size(ownProps.mediaContainers) > 0) {

    _.forEach(currentArticle.article_picture_ids, (picture_id) => {
      // QUICK FIX - HERE, I AM PUSHING ALL THE PICTURES, whether they are for_carousel or for_card
      // AT A LATER STAGE, need to filter out pictures which would not be for carousel (for_card if for index view)
      articlePictures.push(ownProps.articlePictures[picture_id]);

      if (!(ownProps.articlePictures[picture_id]["media_container_id"] === undefined)) {
        mediaContainers[ownProps.articlePictures[picture_id]["media_container_id"]] =
          ownProps.mediaContainers[ownProps.articlePictures[picture_id]["media_container_id"]];
      }
    });

  }

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
    storedFiles:                state.storedFiles,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    articlesActions:        ownProps.articlesActions,
    articlesFieldsActions:  ownProps.articlesFieldsActions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualNewsComponent)
