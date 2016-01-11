import React, {PropTypes} from 'react';

import { NewsEditableFieldToolbar } from './commons/news_editable_field_toolbar';

export const NewsInput = React.createClass({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    type:                      PropTypes.string.isRequired,
    sourceId:                  PropTypes.string,
    value:                     PropTypes.string.isRequired,
    articlesPassedInUiProps:   PropTypes.object.isRequired,
    currArtWIPStateCurrField:  PropTypes.string.isRequired,
    handleChange:              PropTypes.func.isRequired,
    handleUpdate:              PropTypes.func.isRequired,
    handleExitEditField:       PropTypes.func.isRequired,
    handleDeleteText:          PropTypes.func.isRequired,
    handleRestoreText:         PropTypes.func.isRequired
  },

  handleChange(e) {
    this.props.handleChange(e.target.value);
  },

  renderNewsEditableFieldToolbar() {
    return (
      <NewsEditableFieldToolbar
        articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
        currArtWIPStateCurrField=    {this.props.currArtWIPStateCurrField}
        handleUpdate=                {this.props.handleUpdate}
        handleExitEditField=         {this.props.handleExitEditField}
        handleDeleteText=            {this.props.handleDeleteText}
        handleRestoreText=           {this.props.handleRestoreText}/>
    )
  },

  renderInput() {
    return(
      <input
        className=    'form-control'
        type=         {this.props.type}
        onChange=     {this.handleChange}
        defaultValue= {this.props.value}
        value=        {this.props.value}
        ref=          {this.props.name}/>
    )
  },

  renderInputWithNestedToolbar() {
    return (
      <div
        className= 'input-group'
        key=       {`${this.props.name}_editable`}>
          { this.renderInput() }
          { this.renderNewsEditableFieldToolbar() }
      </div>
    )
  },

  render() {
    if ( (this.props.name === "newArticleDate_posted_at" && this.props.type === "date") || ( this.props.name === "newArticleTime_posted_at" && this.props.type === "time" ) ) {
      return this.renderInput()
    } else {
      return this.renderInputWithNestedToolbar()
    }
  }
})