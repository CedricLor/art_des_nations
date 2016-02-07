import React, { PropTypes } from 'react';

import Image from 'dumb_components/image';

export const ImageWrapper = React.createClass({
  propTypes: {
    articlePicture:  PropTypes.object.isRequired,
    sourceId:        PropTypes.number.isRequired,
    cardImageSource: PropTypes.string.isRequired,
    imageTitle:       PropTypes.string.isRequired,
 },

  render() {
    const style = {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "100%"
    }

    return(
      <div>
        <Image
          cardImageSource=  {this.props.cardImageSource}
          title=            {this.props.imageTitle}
          className=        {`img-for-news-slider-${this.props.sourceId} my-news-slider-img my-card-img`}
          style=            {style}
        />
        <div className= "news-picture-overlay">
        </div>
      </div>
    )
  }
})

