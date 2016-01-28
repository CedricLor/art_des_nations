import React, { PropTypes } from 'react';
// ########################################
// ## Image Component
// ########################################

export default class Image extends React.Component {
  render() {
    return (
      <img src={this.props.cardImageSource} alt={this.props.newsTitle} />
    );
  }
}

Image.propTypes = {
  cardImageSource: PropTypes.string,
  newsTitle:       PropTypes.string
};
