import React, {PropTypes} from 'react';

import { GenericGlyphiconButton } from '../../../../../../../dumb_components/generic_buttons';

// Imported by NewsEditButtonEditableZoneSwitch
export const NewsEditButton = React.createClass({
  PropTypes: {
    handleEditField: PropTypes.func.isRequired
  },

  render() {
    const style = {
      backgroundColor: 'white'
    }
    const glyphiconName = 'glyphicon-pencil'

    return (
      <GenericGlyphiconButton
        onClick=       {this.props.handleEditField}
        style=         {style}
        glyphiconName= {glyphiconName}
      />
    )
  }
})
