import React, { PropTypes } from 'react';
import Slider from 'react-slick'
import Image from 'dumb_components/image';

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
      }
    }
    return settingsHash[this.props.siteEditMode.mode];
  },

  createImagesForSlider() {
    let imagesForSlider = this.props.articlePictures.map((articlePicture, i) => {
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
    if ( this.props.siteEditMode.mode === true ) {
      imagesForSlider = imagesForSlider.concat(<div key="onEditPlaceholder"><h3>Click here to add a picture to your slider</h3></div>)
    } else if ( imagesForSlider.length < 2 ) {
      // This should be replaced by displaying turn the slider into a single image,
      // which would require a super-controller.
      imagesForSlider = imagesForSlider.concat(<div key="onMissing2ndPicture"><h3>Switch to edit mode. You must add at least two pictures to your slider.</h3></div>)
    }
    return imagesForSlider
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
    const children = this.createImagesForSlider();

    return (
      <Slider className="my-slick-slider-top-level-component" {...settings}>
        {children}
      </Slider>
    );
  }
});
