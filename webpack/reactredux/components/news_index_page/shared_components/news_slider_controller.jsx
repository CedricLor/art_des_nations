import React, { PropTypes } from 'react';
import Slider from 'react-slick'
import Image from 'dumb_components/image';
import SliderDropZoneController from './slider_drop_zone_controller'

export const NewsSliderController = React.createClass({
  propTypes: {
    siteEditMode:     PropTypes.object.isRequired,
    articlePictures:  PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    mediaContainers:  PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    sourceId:         PropTypes.number.isRequired,
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

            // <div>
            //   <SliderDropZoneController
            //     pictureForDropZone= {this.props.mediaContainers[articlePicture.media_container_id].media}
            //     onPictureChange=    {this.handleChange.bind(this, "card_picture")}
            //   />
            // </div>


  createDropZonesForSlider() {
    console.log("------------------")
    let dropZonesForSlider = this.props.articlePictures.map((articlePicture, i) => {
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
    console.log(dropZonesForSlider)
    // FIXME !!!!!!!!!!!!!!!! Complicated stuff
    // Need to keep a state of all the pictures currently being added
    // and in any case, to add a drop zone at the end of the array
    // plus a function to handle what's happening when you add a picture
    // This function should add it to (i) the array of current pictures associated with the
    // current article, (ii) add a record to the article_pictures array with a reference to (iii) a media_container
    // (iv) keep a WIP state of the articles pictures being added, and (v) probably keep a WIP state of the
    // corresponding media_containers...
    // dropZonesForSlider = dropZonesForSlider.concat(<div key="onEditPlaceholder"><div><SliderDropZoneController pictureForDropZone= {[]}/></div></div>)
    dropZonesForSlider = dropZonesForSlider.concat(<div key="onEditPlaceholder"><div>Toto</div></div>)
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
      this.createImagesForSlider()
    } else {
      this.createDropZonesForSlider()
    }
  },

  render() {
    console.log("************************")
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
