import React, {PropTypes} from 'react';
import { NewsEditButtonEditableZoneSwitch } from './commons/news_edit_button_editable_zone_switch';

export const NewsPostedAtZone = React.createClass({
  PropTypes: {
    value:                     PropTypes.string.isRequired,
    viewType:                  PropTypes.string.isRequired,
    children:                  PropTypes.element
  },

  articleCreatedAtForIndex() {
    const style = {}

    return (
      <p
        style= { style }>
          {this.props.value}
      </p>
    )
  },

  articleCreatedAtForSinglePage() {
    return (
      <h3 className="posted-at">
        {this.props.value}
      </h3>
    )
  },

  switchCreatedAtType() {
    switch (this.props.viewType) {
      case "indexView":
        return this.articleCreatedAtForIndex()
      case "articleView":
        return this.articleCreatedAtForSinglePage()
      default:
        return this.articleCreatedAtForIndex()
    }
  },

  render() {
    return (
      <div>
        {this.switchCreatedAtType()}
        {/*this.editButtonEditableZoneSwitch()*/}
        {this.props.children}
      </div>
    )
  }
})
