import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import {intlShape, injectIntl, defineMessages, FormattedMessage} from 'react-intl';

const messages = defineMessages({
  newArticleDropZoneInfoText: {
    id:             'newArticle.edit.newsForm.dropZone.infoText',
    description:    'Information text to be displayed on the image dropzones (edit mode) before the user has dropped in any image',
    defaultMessage: 'Drop the image that will be used on the index page for this article here, or click to select a file to upload.'
  },
});

const NewsFormDropZoneController = React.createClass({
  propTypes: {
    newArticleCardPictureField: PropTypes.object.isRequired,
    onPictureChange:            PropTypes.func.isRequired,
    intl:                       intlShape.isRequired
  },

  onDrop(files) {
    this.props.onPictureChange(files[0]);
  },

  render: function () {

    return (
      <Dropzone onDrop={this.onDrop} multiple={false} accept='image/*' style={ {width: "100%", height: "100%"} }>
        { (Object.keys(this.props.newArticleCardPictureField).length === 0) ?
          <div
            style={
              { borderStyle: "dotted", textAlign: "center", paddingLeft: "50px", paddingRight: "50px" }
            }
          >
            <FormattedMessage
              {...messages.newArticleDropZoneInfoText}
            />
          </div> :
          <div>
            <img src={this.props.newArticleCardPictureField.preview} />
          </div>
        }
      </Dropzone>
    );
  }
});

export default injectIntl(NewsFormDropZoneController);
