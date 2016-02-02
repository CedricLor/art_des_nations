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
    articlePictureForDropZone:      PropTypes.object.isRequired, /* This is a mediaContainer or a storedFile object type */
    createAdditionalArticlePicture: PropTypes.func.isRequired,
    changeArticlePicture:           PropTypes.func,
    intl:                           intlShape.isRequired
  },

// // lastModified: 1453903478000
// // lastModifiedDate: Wed Jan 27 2016 15:04:38 GMT+0100 (CET)
// // name: "china_5_reduced.jpg"
// // preview: "blob:http%3A//localhost%3A3000/5bcdbc43-38a5-4dc4-9fa7-c1c986be72bc"
// // size: 23970
// // type: "image/jpeg"
// // webkitRelativePath: ""

// // lastModified: PropTypes.num
// // lastModifiedDate: PropTypes.object
// // name: PropTypes.string
// // preview: PropTypes.string
// // size: PropTypes.num
// // type: PropTypes.string
// // webkitRelativePath: PropTypes.string

// // articlePicture
// // for_card: "true"
// // for_carousel: "true"
// // id: 29
// // media_container_id: 29

// // mediaContainer
// // id: 29
// // media: "http://locomotive-test-cedric.s3.amazonaws.com/development/media_containers/media/000/000/029/original/china_5_reduced.jpg?1454268900"
// // media_content_type: "image/jpeg"
// // media_file_name: "china_5_reduced.jpg"
// // media_file_size: 23970
// // title: "Test"

// In Rails/PGSql
//     t.string   "media_file_name" --> name
//     t.string   "media_content_type" --> type
//     t.integer  "media_file_size" --> size
//     t.datetime "media_updated_at" --> lastModifiedDate

  onDrop(files) {
    (Object.keys(this.props.articlePictureForDropZone).length === 0) ?
    // this.props.createAdditionalArticlePicture(locale, articleId, file, forCard, forCarousel) : locale and articleId are bound
    this.props.createAdditionalArticlePicture(files[0], "false", "true") :
    // this.props.articlePictureAddNew(files[0]) :
    this.props.changeArticlePicture(files[0])
  },

  render() {
    console.log("--------------------", this.props)
    return (
      <Dropzone
        onDrop=   {this.onDrop}
        multiple= {false}
        accept=   'image/*'
        style=    { {width: "100%", height: "100%"} }>
        {
          (Object.keys(this.props.articlePictureForDropZone).length === 0) ?
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
            <img src={this.props.articlePictureForDropZone.media || this.props.articlePictureForDropZone.preview} />
          </div>
        }
      </Dropzone>
    )
  }
});

export default injectIntl(SliderDropZoneController);
