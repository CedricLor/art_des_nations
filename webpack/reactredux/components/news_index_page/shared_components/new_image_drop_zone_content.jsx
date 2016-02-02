import React, { PropTypes } from 'react';

import {intlShape, injectIntl, defineMessages, FormattedMessage} from 'react-intl';

const messages = defineMessages({
  sliderDropZoneInfoText: {
    id:             'slider.edit.singleArticleViewSlider.dropZone.infoText',
    description:    'Information text to be displayed on the image dropzones (edit mode) before the user has dropped in any image',
    defaultMessage: 'Click or drop an image here'
  },
});

export const NewImageDropZoneContent = React.createClass({
  propTypes: {
    intl:                           intlShape.isRequired
  },

  render() {
    return(
            <div
              style={
                {
                  borderStyle: "dotted",
                  textAlign: "center",
                  paddingLeft: "50px",
                  paddingRight: "50px"
                }
              }
            >
              <FormattedMessage
                {...messages.sliderDropZoneInfoText}
              />
            </div>
    )
  }
})

export default injectIntl(NewImageDropZoneContent);
