import React, {PropTypes} from 'react';
import {defineMessages, FormattedMessage} from 'react-intl';

/////////////////////////////
// AdminSwitchButton(s)!!! //
/////////////////////////////
export const EditSwitchButton = React.createClass({
  propTypes: {
    siteEditMode:              PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    onToggleSiteEditMode:      PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      "defaultMessageForEditBtn": {
        "false": "Edit website",
        "true": "Exit edit website mode"
      }
    }
  },

  handleToggleSiteEditMode(e) {
    e.preventDefault();
    this.props.onToggleSiteEditMode();
  },

  render() {
    const messages = defineMessages({
      editBtnTxt: {
          id:             `site.edit.editBtn.${this.props.siteEditMode.mode}`,
          description:    'Toogle edit website button text for site admins',
          defaultMessage: this.props.defaultMessageForEditBtn[this.props.siteEditMode.mode],
      }
    });

    return (
      <a className='btn btn-danger' onClick={this.handleToggleSiteEditMode}>
        <FormattedMessage {...messages.editBtnTxt} />
      </a>
    );
  }
})
