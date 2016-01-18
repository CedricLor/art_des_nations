import React, {PropTypes} from 'react';

import { GenericMenuItemForDropDownMenu } from 'dumb_components/generic_dropdown_menu';
import { GenericEditableFieldToolbar } from 'dumb_components/generic_toolbars';

import {intlShape, injectIntl, defineMessages} from 'react-intl';


const messages = defineMessages({
  exitEditMenuItem: {
    id:             'article.edit.field.exitEditMenuItem',
    description:    'Exit edit menu item for each field on the articles in edit mode (on both the articles index view or individual article view); allows the editor to exit the edit mode of the field without saving it',
    defaultMessage: 'Exit edit'
  },
  deleteTextMenuItem: {
    id:             'article.edit.field.deleteTextMenuItem',
    description:    'Delete text menu item for each field on the articles in edit mode (on both the articles index view or individual article view); allows the editor to delete all the text in the field',
    defaultMessage: 'Delete text'
  },
  restoreTextMenuItem: {
    id:             'article.edit.field.restoreTextMenuItem',
    description:    'Restore text menu item for each field on the articles in edit mode (on both the articles index view or individual article view); allows the editor to restore the initial text of the field (in case the editor changes its mind about what he has been doing)',
    defaultMessage: 'Restore initial text'
  },
});

// ########################################
// ## NewsEditableFieldToolbar Component
// ########################################
const NewsEditableFieldToolbar = React.createClass({
  PropTypes: {
    articlesPassedInUiProps:   PropTypes.object.isRequired,
    handleExitEditField:       PropTypes.func.isRequired,
    handleDeleteText:          PropTypes.func.isRequired,
    handleRestoreText:         PropTypes.func.isRequired,
    handleUpdate:              PropTypes.func.isRequired,
    currArtWIPStateCurrField:  PropTypes.string,
    intl:                      intlShape.isRequired
  },

  deleteTextButton(formatMessage) {
    return (
      <GenericMenuItemForDropDownMenu
        onClick= {this.props.handleDeleteText}
        text=    {formatMessage(messages.deleteTextMenuItem)}
      />
    )
  },

  restoreTextButton(formatMessage) {
    return (
      <GenericMenuItemForDropDownMenu
        onClick= {this.props.handleRestoreText}
        text=    {formatMessage(messages.restoreTextMenuItem)}
      />
    )
  },

  exitEditFieldButton(formatMessage) {
    return (
      <GenericMenuItemForDropDownMenu
        onClick= {this.props.handleExitEditField}
        text=    {formatMessage(messages.exitEditMenuItem)}
      />
    )
  },

  render() {
    console.log(this.props)
    const {formatMessage} = this.props.intl;

    let firstButton;
    if (this.props.currArtWIPStateCurrField) {
      firstButton = this.restoreTextButton(formatMessage)
    } else {
      firstButton = this.exitEditFieldButton(formatMessage)
    }
    const secondButton = this.deleteTextButton(formatMessage);

    return(
      <GenericEditableFieldToolbar
        handleUpdate= {this.props.handleUpdate}
        arrayOfItems= {[ firstButton, secondButton ]}
      />
    )
  }
})

export default injectIntl(NewsEditableFieldToolbar);
