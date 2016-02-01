import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import {intlShape, injectIntl, defineMessages, FormattedMessage} from 'react-intl';

const messages = defineMessages({
  sliderDropZoneInfoText: {
    id:             'slider.edit.singleArticleViewSlider.dropZone.infoText',
    description:    'Information text to be displayed on the image dropzones (edit mode) before the user has dropped in any image',
    defaultMessage: 'Click here or drop an image here to add another picture to your article and get slider on top of it!!! Cool stuffs!!!'
  },
});

const SliderDropZoneController = React.createClass({
  propTypes: {
    pictureForDropZone: PropTypes.array.isRequired,
    onPictureChange:    PropTypes.func.isRequired,
    intl:               intlShape.isRequired
  },

  onDrop(files) {
    this.props.onPictureChange(files[0]);
  },

  render() {
    const content = (this.props.pictureForDropZone.length === 0) ?
          <div
            style={
              { borderStyle: "dotted", textAlign: "center", paddingLeft: "50px", paddingRight: "50px" }
            }
          >
            <FormattedMessage
              {...messages.sliderDropZoneInfoText}
            />
          </div> :
          <div>
            <img src={this.props.pictureForDropZone.preview} />
          </div>

    return (
      <Dropzone
        onDrop=   {this.onDrop}
        multiple= {false}
        accept=   'image/*'
        style=    { {width: "100%", height: "100%"} }>
        {content}
      </Dropzone>
    )
  }
});

export default injectIntl(SliderDropZoneController);
