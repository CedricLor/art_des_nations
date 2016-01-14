import React, {PropTypes} from 'react';

import { GenericMenuItemForDropDownMenu } from '../../../../../../../../dumb_components/generic_dropdown_menu';
import { GenericEditableFieldToolbar } from '../../../../../../../../dumb_components/generic_toolbars';


// ########################################
// ## NewsEditableFieldToolbar Component
// ########################################
export const NewsEditableFieldToolbar = React.createClass({
  PropTypes: {
    articlesPassedInUiProps:   PropTypes.object.isRequired,
    handleExitEditField:       PropTypes.func.isRequired,
    handleDeleteText:          PropTypes.func.isRequired,
    handleRestoreText:         PropTypes.func.isRequired,
    handleUpdate:              PropTypes.func.isRequired,
    currArtWIPStateCurrField:  PropTypes.string
  },

  deleteTextButton() {
    return (
      <GenericMenuItemForDropDownMenu
        onClick= {this.props.handleDeleteText}
        text=    {this.props.articlesPassedInUiProps.deleteText.text}
      />
    )
  },

  restoreTextButton() {
    return (
      <GenericMenuItemForDropDownMenu
        onClick= {this.props.handleRestoreText}
        text=    {this.props.articlesPassedInUiProps.restoreText.text}
      />
    )
  },

  exitEditFieldButton() {
    return (
      <GenericMenuItemForDropDownMenu
        onClick= {this.props.handleExitEditField}
        text=    {this.props.articlesPassedInUiProps.exitEditField.text}
      />
    )
  },

  render() {

    let firstButton;
    if (this.props.currArtWIPStateCurrField) {
      firstButton = this.restoreTextButton()
    } else {
      firstButton = this.exitEditFieldButton()
    }
    const secondButton = this.deleteTextButton();

    return(
      <GenericEditableFieldToolbar
        handleUpdate= {this.props.handleUpdate}
        arrayOfItems= {[ firstButton, secondButton ]}
      />
    )
  }
})
