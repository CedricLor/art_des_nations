import React, {PropTypes} from 'react';
import {Input, TextArea, CkEditor, EditButton} from 'dumb_components/generic_form_field_elements'

import SpecificInternationalizedEditableFieldToolbar from 'dumb_components/specific_internationalized_editable_field_toolbar';

export const NewsEditButtonEditableZoneSwitch = React.createClass({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    type:                      PropTypes.string.isRequired,
    sourceId:                  PropTypes.string.isRequired,
    value:                     PropTypes.string.isRequired,

    currArtWIPStateCurrField:  PropTypes.string.isRequired,
    currArtEditStateCurrField: PropTypes.string.isRequired,

    handleChange:              PropTypes.func.isRequired,
    handleUpdate:              PropTypes.func.isRequired,
    handleEditField:           PropTypes.func.isRequired,
    handleExitEditField:       PropTypes.func.isRequired,
    handleDeleteText:          PropTypes.func.isRequired,
    handleRestoreText:         PropTypes.func.isRequired
  },

  createEditableFieldToolbar() {
    return (
      <SpecificInternationalizedEditableFieldToolbar
        handleUpdate=                {this.props.handleUpdate}
        handleExitEditField=         {this.props.handleExitEditField}
        handleDeleteText=            {this.props.handleDeleteText}
        handleRestoreText=           {this.props.handleRestoreText}
        currArtWIPStateCurrField=    {this.props.currArtWIPStateCurrField}
      />
    )
  },

  renderFormControl(formControlName) {
    return (
      React.createElement(
        formControlName,
        {
          name:                    this.props.name,
          type:                    this.props.type,
          sourceId:                this.props.sourceId,
          value:                   this.props.value,
          handleChange:            this.props.handleChange,

          editableFieldToolbar:    this.createEditableFieldToolbar(),
        }
      )
    )
  },

  editButton() {
    return (
      <EditButton
        name=            {this.props.name}
        handleEditField= {this.props.handleEditField}/>
    )
  },

  render() {
    if (this.props.currArtEditStateCurrField) {
      // # if field edit mode is on, show inputs, textarea or ckeditor and field toolbar
      switch (this.props.type) {
        case "text":
          return this.renderFormControl(Input);
        case "textarea":
          return this.renderFormControl(TextArea);
        case "ckeditor":
          return this.renderFormControl(CkEditor);
        default:
          return this.renderFormControl(Input);
      }
      // # else show pencil button
    }
    else {
      return this.editButton()
    }
  },
})
