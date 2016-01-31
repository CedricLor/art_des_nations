import React, {PropTypes} from 'react';
import { inlineBlockStyleForReadOnly, rawMarkup } from '../news_forms_helpers';

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

