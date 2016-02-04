import React, { PropTypes } from 'react';

export const ImageDestroyButton = React.createClass({
  propTypes: {
    deleteArticlePicture: PropTypes.func.isRequired
  },

  onClick(e) {
    e.preventDefault();
    this.props.deleteArticlePicture();
  },

  render() {
    return(
      <button
        type="button"
        style={{position: "absolute", right: "5px", top: "5px", zIndex:"5000"}}
        onClick={this.onClick}
        className="btn btn-danger"
        aria-label="Trash Can Button for Image"
      >
        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>
    )
  }
})
