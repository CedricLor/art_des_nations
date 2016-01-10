import React, {PropTypes} from 'react';

import { GenericToolbarButton, GenericToolbarCaretDropdownButton } from './generic_buttons';
import { GenericDropDownMenu, GenericMenuItemForDropDownMenu, GenericMenuItemInactiveForDropDownMenu } from './generic_dropdown_menu';

// ########################################
// ## GenericEditableFieldToolbar Component
// ########################################
export const GenericEditableFieldToolbar = React.createClass({
  PropTypes: {
    arrayOfItems:              PropTypes.array.isRequired,
    handleUpdate:              PropTypes.func.isRequired,
  },

  iconForSaveBtn() {
    return (
      <span
        className=  'glyphicon glyphicon-floppy-save'
        ariaHidden= 'true'>
      </span>
    )
  },

  render() {

    return(
      <div className= 'input-group-btn'>
        <GenericToolbarButton
          onClick=  {this.props.handleUpdate}
          children= {this.iconForSaveBtn()}
          />
        <GenericToolbarCaretDropdownButton />
        <GenericDropDownMenu
          arrayOfItems= { this.props.arrayOfItems }
          />
      </div>
    )
  }
})


// ########################################
// ## GenericStatusSwitcherToolbar Component
// ########################################
export const GenericStatusSwitcherToolbar = React.createClass({
  PropTypes: {
    arrayOfStatus:  PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired
    }).isRequired).isRequired,
    activeStatus: PropTypes.string.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    mainBtnText:    PropTypes.string.isRequired
  },

  onStatusChange(nextStatus) {
    this.props.onStatusChange(nextStatus);
  },

  renderStatusOption(status, index) {
    if (status.action === this.props.activeStatus) {
      return (
        <GenericMenuItemInactiveForDropDownMenu
          key=  { index }
          text= { status.text }
        />
      )
    }

    return (
      <GenericMenuItemForDropDownMenu
        key=     { index }
        onClick= { this.onStatusChange.bind(this, status.action) }
        text=    { status.text }
      />
    )
  },

  createArrayOfItems(arrayOfStatus) {
    return arrayOfStatus.map( (status, index) => {return this.renderStatusOption(status, index)} )
  },

  render() {
    const arrayOfItems = this.createArrayOfItems(this.props.arrayOfStatus);

    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default">{ this.props.mainBtnText }</button>
        <GenericToolbarCaretDropdownButton />
        <GenericDropDownMenu
          arrayOfItems= { [arrayOfItems] }
          />
      </div>
    )
  }
})
