import React, {PropTypes} from 'react';
import {NewsInput} from './news_edit_button_editable_zone_switch/news_input'
import {NewsTextArea} from './news_edit_button_editable_zone_switch/news_text_area'
import {NewsCkEditor} from './news_edit_button_editable_zone_switch/news_ck_editor'
import {NewsEditButton} from './news_edit_button_editable_zone_switch/news_edit_button'

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

  renderFormControl(formControlName) {
    return (
      React.createElement(
        formControlName,
        {
          name:                        this.props.name,
          type:                        this.props.type,
          sourceId:                    this.props.sourceId,
          value:                       this.props.value,

          currArtWIPStateCurrField:    this.props.currArtWIPStateCurrField,

          handleChange:                this.props.handleChange,
          handleUpdate:                this.props.handleUpdate,
          handleExitEditField:         this.props.handleExitEditField,
          handleDeleteText:            this.props.handleDeleteText,
          handleRestoreText:           this.props.handleRestoreText
        }
      )
    )
  },

  editButton() {
    return (
      <NewsEditButton
        name=            {this.props.name}
        handleEditField= {this.props.handleEditField}/>
    )
  },

  editButtonEditableZoneSwitch() {
    if (this.props.currArtEditStateCurrField) {
      // # if field edit mode is on, show inputs, textarea or ckeditor and field toolbar
      switch (this.props.type) {
        case "text":
        case "date":
          return this.renderFormControl(NewsInput);
        case "textarea":
          return this.renderFormControl(NewsTextArea);
        case "ckeditor":
          return this.renderFormControl(NewsCkEditor);
        default:
          return this.renderFormControl(NewsInput);
      }
      // # else show pencil button
    }
    else {
      return this.editButton()
    }
  },

  render() {
    const editButtonOrEditableZoneSwitch = this.editButtonEditableZoneSwitch();

    return (
      <span>
        { editButtonOrEditableZoneSwitch }
      </span>
    )
  }
})
