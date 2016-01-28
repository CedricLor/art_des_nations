import React, {PropTypes} from 'react';
import NewsEditableFieldToolbar from './commons/news_editable_field_toolbar';

export const NewsTextArea = React.createClass({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    sourceId:                  PropTypes.string,
    value:                     PropTypes.string.isRequired,
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

  render() {
    return (
      <div
        className= 'input-group'
        key=       {`${this.props.name}_editable`}>
        <textarea
          className=    'form-control'
          rows=         "3"
          onChange=     {this.handleChange}
          defaultValue= {this.props.value}
          value=        {this.props.value}
          ref=          {this.props.name}
          name=         {this.props.name}
          id=           {`${this.props.name}_${this.props.sourceId}`}>
        </textarea>
        <NewsEditableFieldToolbar
          currArtWIPStateCurrField=    {this.props.currArtWIPStateCurrField}
          handleUpdate=                {this.props.handleUpdate}
          handleExitEditField=         {this.props.handleExitEditField}
          handleDeleteText=            {this.props.handleDeleteText}
          handleRestoreText=           {this.props.handleRestoreText}/>
      </div>
    )
  }
})
