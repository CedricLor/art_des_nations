import React, {PropTypes} from 'react';

import { GenericStatusSwitcherToolbar } from '../../../dumb_components/generic_toolbars';
/////////////////////////////
// Visiblity Filter Switch //
/////////////////////////////

export const ArticlesStatusVisibilityFilterSwitch = React.createClass({
  propTypes: {
    articlesVisibilityFilter: PropTypes.string.isRequired,
    onFilterChange:           PropTypes.func.isRequired
  },

  render() {
    return (
      <GenericStatusSwitcherToolbar
        arrayOfStatus=  { [
          {
            'text': 'View all',
            'action': 'SHOW_ALL'
          },
          {
            'text': 'View draft only',
            'action': 'SHOW_DRAFT'
          },
          {
            'text': 'View published only',
            'action': 'SHOW_PUBLISHED'
          },
          {
            'text': 'View featured only',
            'action': 'SHOW_FEATURED'
          },
          {
            'text': 'View archived only',
            'action': 'SHOW_ARCHIVED'
          }
          ] }
        activeStatus=   { this.props.articlesVisibilityFilter }
        onStatusChange= { this.props.onFilterChange }
        mainBtnText=    'Filter articles:'
      />
    )
  }
})

