import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

export const SliderDropZoneController = React.createClass({
  propTypes: {
    children:       PropTypes.element.isRequired, /* This is an element generated in image_image_slider_switch */
    onDrop:         PropTypes.func.isRequired,
    destroyButton:  PropTypes.element
  },

  onDrop(files) {
    this.props.onDrop(files[0]);
  },

  render() {
    return (
      <div style={ {position: "relative"} }>
        {(this.props.destroyButton) ? this.props.destroyButton : null}
        <Dropzone
          onDrop=   {this.onDrop}
          multiple= {false}
          accept=   'image/*'
          style=    { {width: "100%", height: "100%"} }>
          {this.props.children}
        </Dropzone>
      </div>
    )
  }
});

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
