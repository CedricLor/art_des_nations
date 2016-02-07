import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { IndividualNewsComponent } from '../components/news_index_page/individual_news_component'

import {localeArticlePicturesSelector, localeMediaContainersSelector} from '../selectors/index'

function mapStateToProps(state, ownProps) {
  const currentArticle = _.find(state.articles[`${state.siteCurrentLocale}`], { 'id': parseInt(ownProps.params.id)});

  const localeArticlePictures = localeArticlePicturesSelector(state);
  const localeMediaContainers = localeMediaContainersSelector(state);

  const [articlePictures, mediaContainers] = [[], {}];

  if (currentArticle.article_picture_ids.length > 0) {
    _.forEach(currentArticle.article_picture_ids, (picture_id) => {
      const currentPicture = localeArticlePictures[picture_id];
      // If the selected articlePicture is for the carousel (i.e. for the single article view)
      if (currentPicture.for_carousel === "true") {
        // push it into the array of articlePictures that will be passed to the individual news component
        articlePictures.push(currentPicture);
        /* if the selected articlePicture does not have a stored_file_id (i.e. undefined) or a stored_file_id marked as null
        then we should retrieve the mediaContainer associated with the articlePicture.
        Priority is given to the storedFiles as they are work in progress */
        if (currentPicture.stored_file_id === undefined || null) {
          const mediaContainerId = currentPicture.media_container_id;
          mediaContainers[mediaContainerId] = localeMediaContainers[mediaContainerId];
        }
      }
    });
  }

  const storedFiles = (state.storedFiles && state.storedFiles[currentArticle.id]) ? state.storedFiles[currentArticle.id] : state.storedFiles;

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
    storedFiles:                storedFiles,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    articlesActions:        ownProps.articlesActions,
    articlesFieldsActions:  ownProps.articlesFieldsActions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualNewsComponent)

// siteEditMode.mode === true
//   no ArticlePictures -> render a dropZone with infotext
//   1 articlePicture:
//     - coming from the DB: -> render a dropZone with the picture from the mediaContainers and an option to add another picture
//     - coming from a file: -> render a dropZone with the picture from the storedFiles and an option to add another picture
//   several articlePictures:
//     - all coming from the DB: -> render a slider with all the pictures from the mediaContainers in DropZones and a slide with a dropZone infotext
//     - all coming from the files: -> render a slider with all the pictures from the storedFiles and a slide with a dropZone infotext
//     - partly coming from the files and partly coming from the DB: -> render a slider with all the pictures from the mediaContainers or the storeFiles, and a slide with a dropZone infotext
// siteEditMode.mode === false
//   no articlePictures -> render nothing
//   1 articlePicture
//     - coming from the DB: -> render an image
//     - coming from a file: -> render an image
//   several articlePictures
//     - coming from the DB: -> render a slider with images
//     - coming from the files: -> render a slider with images
//     - coming partly from the DB and partly from the files: -> render a slider with images
