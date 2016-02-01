import React, { PropTypes } from 'react';

import Image from 'dumb_components/image';
import {NewsSliderController} from './news_slider_controller'

export const ImageImageSliderSwitch = React.createClass({
  propTypes: {
    siteEditMode:     PropTypes.object.isRequired,
    articlePictures:  PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    mediaContainers:  PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    sourceId:         PropTypes.number.isRequired,
  },

  render() {
    return(
      ((this.props.siteEditMode.mode === false) && (this.props.articlePictures.length < 2)) ?
      <div className="single-image-container">
        <Image
          cardImageSource=  {this.props.mediaContainers[this.props.articlePictures[0].media_container_id].media}
          newsTitle=        {this.props.mediaContainers[this.props.articlePictures[0].media_container_id].title}
          className=        {`img-for-news-card-${this.props.sourceId} my-news-card-img my-card-img`}
        />
        <div className= "news-picture-overlay">
        </div>
      </div>
      :
      <NewsSliderController
        siteEditMode=     {this.props.siteEditMode}
        articlePictures=  {this.props.articlePictures}
        mediaContainers=  {this.props.mediaContainers}
        sourceId=         {this.props.sourceId}
      />
    )
  }
})
