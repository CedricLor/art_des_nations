import React, {PropTypes} from 'react';
import {NewsEditButtonEditableZoneSwitch} from './commons/news_edit_button_editable_zone_switch';
import { inlineBlockStyleForReadOnly, rawMarkup } from '../../../../component_helpers/news_forms_helpers';

export const NewsBodyZone = React.createClass({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    value:                     PropTypes.string.isRequired,
    siteEditMode:              PropTypes.object.isRequired,
    children:                  PropTypes.element
  },

  render() {
    let styleForBody = {}
    styleForBody = inlineBlockStyleForReadOnly(styleForBody, this.props.siteEditMode.mode)

    return (
      <div key= {this.props.name}>
        <div
          className=               {`news_${this.props.name}`}
          style=                   {styleForBody}
          dangerouslySetInnerHTML= {rawMarkup(this.props.value)}
          >
        </div>
        {this.props.children}
      </div>
    )
  },

})

