import React, { PropTypes } from 'react';
// ########################################
// ## Image Component
// ########################################

export default class Image extends React.Component {
  render() {
    return (
      <img src={this.props.cardImageSource} alt={this.props.title} className={this.props.className} />
    );
  }
}

Image.propTypes = {
  cardImageSource: PropTypes.string,
  title:       PropTypes.string,
  className:       PropTypes.string
};
