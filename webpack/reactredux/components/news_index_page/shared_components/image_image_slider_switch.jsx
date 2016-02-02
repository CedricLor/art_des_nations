import React, { PropTypes } from 'react';

import {ImageWrapper} from './image_wrapper';
import {SliderDropZoneController} from './slider_drop_zone_controller'
import {NewsSliderController} from './news_slider_controller'
import NewImageDropZoneContent from './new_image_drop_zone_content'
import {ImageDestroyButton} from './image_destroy_button'

export const ImageImageSliderSwitch = React.createClass({
  propTypes: {
    siteEditMode:                   PropTypes.object.isRequired,
    articlePictures:                PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    mediaContainers:                PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    storedFiles:                    PropTypes.object,
    sourceId:                       PropTypes.number.isRequired,
    createAdditionalArticlePicture: PropTypes.func.isRequired,
    changeArticlePicture:           PropTypes.func.isRequired,
    deleteArticlePicture:           PropTypes.func.isRequired,
  },

  createArrayOfDropZones() {
    const newPictureDropZone =  <div key="onEditPlaceholder">
                                  <SliderDropZoneController onDrop={this.props.createAdditionalArticlePicture.bind(null, "false", "true")}>
                                    <NewImageDropZoneContent/>
                                  </SliderDropZoneController>
                                </div>

    let arrayOfDropZones = this.props.articlePictures.map((articlePicture, i) => {
      const imageDestroyButton = <ImageDestroyButton deleteArticlePicture={this.props.deleteArticlePicture.bind(null, articlePicture.id, articlePicture.stored_file_id, articlePicture.media_container_id)}/>
      return(
        <div key= {i}>
          <SliderDropZoneController
            destroyButton=  {imageDestroyButton}
            children=       {this.createImageWrapper(articlePicture, i)}
            onDrop=         {this.props.changeArticlePicture.bind(null, articlePicture.id, articlePicture.for_card, articlePicture.for_carousel)}
          />
        </div>
      )
    })

    return arrayOfDropZones.concat(newPictureDropZone)
  },

  createImageWrapper(articlePicture, i) {
    return(
      <ImageWrapper
        key=            {i}
        articlePicture= {articlePicture}
        sourceId=       {this.props.sourceId}
        cardImageSource={(this.props.storedFiles[articlePicture.stored_file_id]) ? this.props.storedFiles[articlePicture.stored_file_id].preview : this.props.mediaContainers[articlePicture.media_container_id].media}
        imageTitle=     {(this.props.storedFiles[articlePicture.stored_file_id]) ? this.props.storedFiles[articlePicture.stored_file_id].name : this.props.mediaContainers[articlePicture.media_container_id].title}
      />
    )
  },

  createArrayOfImages() {
    return this.props.articlePictures.map((articlePicture, i) => {
      return this.createImageWrapper(articlePicture, i)
    })
  },

  render() {
    const childrenImages =  (this.props.siteEditMode.mode === false) ?
                            this.createArrayOfImages() :
                            this.createArrayOfDropZones()
    return(
      (childrenImages.length === 1) ?
      childrenImages[0] :
      <NewsSliderController
        siteEditMode= {this.props.siteEditMode}
        children=     {childrenImages}
      />
    )
  }

})
