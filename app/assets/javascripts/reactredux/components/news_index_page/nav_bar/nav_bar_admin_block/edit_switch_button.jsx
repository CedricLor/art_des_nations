import React, {PropTypes} from 'react';

/////////////////////////////
// AdminSwitchButton(s)!!! //
/////////////////////////////
export const EditSwitchButton = React.createClass({
  propTypes: {
    siteEditModePassedInProps: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    siteEditMode:              PropTypes.objectOf(PropTypes.bool.isRequired).isRequired
  },

  handleToggleSiteEditMode(e) {
    e.preventDefault();
    this.props.onToggleSiteEditMode();
  },

  render() {
    return (
      <a className='btn btn-danger' onClick={this.handleToggleSiteEditMode}>
        {this.props.siteEditModePassedInProps.site_edit_mode_button_props.button_text[this.props.siteEditMode.mode]}
      </a>
    );
  }
})

