import React, {PropTypes} from 'react';

import { GenericStatusSwitcherToolbar } from '../../../../../dumb_components/generic_toolbars';

/////////////////////////////////////////////
// Single article visibility filter switch //
////////////////////////////////////////////

export const ArticleStatusSwitch = React.createClass({
  propTypes: {
    articleStatus:  PropTypes.string.isRequired,
    onStatusChange: PropTypes.func.isRequired
  },

  render() {
    return (
      <GenericStatusSwitcherToolbar
        arrayOfStatus=  { [
          {
            'text': 'draft',
            'action': 'draft'
          },
          {
            'text': 'published',
            'action': 'published'
          },
          {
            'text': 'featured',
            'action': 'featured'
          },
          {
            'text': 'archived',
            'action': 'archived'
          }
          ] }
        activeStatus=  { this.props.articleStatus }
        onStatusChange= { this.props.onsStatusChange }
        mainBtnText=    'Set status of articles:'
      />
    )
  }
})

