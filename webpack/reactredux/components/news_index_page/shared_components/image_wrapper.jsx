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
    return(
      <div>
        <Image
          cardImageSource=  {this.props.cardImageSource}
          title=            {this.props.imageTitle}
          className=        {`img-for-news-card-${this.props.sourceId} my-news-card-img my-card-img`}
        />
        <div className= "news-picture-overlay">
        </div>
      </div>
    )
  }
})
