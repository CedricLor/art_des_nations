import React, { PropTypes } from 'react';
import Slider from 'react-slick'
import Image from 'dumb_components/image';
import SliderDropZoneController from './slider_drop_zone_controller'

export const NewsSliderController = React.createClass({
  propTypes: {
    siteEditMode:                   PropTypes.object.isRequired,
    articlePictures:                PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    mediaContainers:                PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    storedFiles:                    PropTypes.object,
    sourceId:                       PropTypes.number.isRequired,
    createAdditionalArticlePicture: PropTypes.func.isRequired,
    changeArticlePicture:           PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      siteEditMode: {
        mode: false
      }
    }
  },

  variableSettings() {
    const settingsHash = {
      false: /* on siteEdtMode === false*/ {
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: true,
        lazyLoad: true
      },
      true: /* on siteEditMode === true */ {
        autoplay: false,
        draggable: false,
        lazyLoad: false,
      }
    }
    return settingsHash[this.props.siteEditMode.mode];
  },

  createDropZonesForSlider() {
    let dropZonesForSlider = this.props.articlePictures.map((articlePicture, i) => {
      if (articlePicture.for_carousel === "true") {
        return(
          <div key= {i}>
            <div>
              <SliderDropZoneController
                articlePictureForDropZone=      {(articlePicture.media_container_id) ? this.props.mediaContainers[articlePicture.media_container_id] : this.props.storedFiles[articlePicture.stored_file_id]}
                createAdditionalArticlePicture= {this.props.createAdditionalArticlePicture}
                changeArticlePicture=           {this.props.changeArticlePicture.bind(null, articlePicture.id, articlePicture.for_card, articlePicture.for_carousel)}
              />
            </div>
          </div>
        )
      }
    })

    const newPictureDropZone =  <div key="onEditPlaceholder">
                                  <div>
                                    <SliderDropZoneController
                                      articlePictureForDropZone=      {{}}
                                      createAdditionalArticlePicture= {this.props.createAdditionalArticlePicture}
                                    />
                                  </div>
                                </div>
    dropZonesForSlider = dropZonesForSlider.concat(newPictureDropZone)
    return dropZonesForSlider
  },

  createImagesForSlider() {
    return this.props.articlePictures.map((articlePicture, i) => {
      if (articlePicture.for_carousel === "true") {
        return(
          <div key= {i}>
            <Image
              cardImageSource=  {this.props.mediaContainers[articlePicture.media_container_id].media}
              newsTitle=        {this.props.mediaContainers[articlePicture.media_container_id].title}
              className=        {`img-for-news-card-${this.props.sourceId} my-news-card-img my-card-img`}
            />
            <div className= "news-picture-overlay">
            </div>
          </div>
        )
      }
    })
  },

  createContentForSlider() {
    if (this.props.siteEditMode.mode === false) {
      return this.createImagesForSlider()
      console.log("after creation !!!!!!!!!!!!!!!!!!!!!!!")
    } else {
      return this.createDropZonesForSlider()
    }
  },

  render() {
    const commonSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      fade: true,
      pauseOnHover: true
    }
    const settings = Object.assign({}, commonSettings, this.variableSettings())
    const children = this.createContentForSlider();

    return (
      <Slider className="my-slick-slider-top-level-component" {...settings}>
        {children}
      </Slider>
    );
  }
});
