import React, {PropTypes} from 'react';

import { GenericGlyphiconButton } from 'dumb_components/generic_buttons';




export const EditButton = React.createClass({
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




export const Input = React.createClass({
  PropTypes: {
    name:                  PropTypes.string.isRequired,
    type:                  PropTypes.string.isRequired,
    sourceId:              PropTypes.string.isRequired,
    value:                 PropTypes.string.isRequired,
    handleChange:          PropTypes.func.isRequired,

    editableFieldToolbar:  PropTypes.element.isRequired
  },

  handleChange(e) {
    this.props.handleChange(e.target.value);
  },

  render() {
    return (
      <div
        className= 'input-group'
        key=       {`${this.props.name}_editable`}>
        <input
          className=    'form-control'
          ref=          {this.props.name}
          type=         {this.props.type}
          defaultValue= {this.props.value}
          value=        {this.props.value}
          onChange=     {this.handleChange}
        />
        { this.props.newsEditableFieldToolbar }
      </div>
    )
  },
})




export const TextArea = React.createClass({
  PropTypes: {
    name:                  PropTypes.string.isRequired,
    sourceId:              PropTypes.string,
    value:                 PropTypes.string.isRequired,
    handleChange:          PropTypes.func.isRequired,

    editableFieldToolbar:  PropTypes.element.isRequired
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
        { this.props.newsEditableFieldToolbar }
      </div>
    )
  }
})





export const NewsCkEditor = React.createClass({
  PropTypes: {
    name:                  PropTypes.string.isRequired,
    sourceId:              PropTypes.string,
    value:                 PropTypes.string.isRequired,
    handleChange:          PropTypes.func.isRequired,

    editableFieldToolbar:  PropTypes.element.isRequired
  },

  componentDidMount() {
    let myCkeditor = CKEDITOR.replace( `${this.props.name}_${this.props.sourceId}`, {
      allowedContent : true,
      pasteFromWordRemoveFontStyles : false,
      pasteFromWordRemoveStyles : false
      });
    myCkeditor.on( 'change', (evt) => {
      this.pushChangesUp(evt.editor.getData());
    });
    // console.log(CKEDITOR.instances[`${this.props.name}_${this.props.card.id}`].getData());
    // console.log("called");
    // console.log(this.state);
  },

  componentWillUnmout() {
    CKEDITOR.instances[`${this.props.name}_${this.props.sourceId}`].destroy();
  },

  pushChangesUp(newText) {
    this.props.handleChange(newText);
  },

  handleChange(e) {
    this.props.handleChange(e.target.value);
  },

  render() {
    return (
      <div
        className= 'input-group'
        key=       {`${this.props.name}_ck_editable`}>
        <textarea
          className=    'form-control'
          rows=         "3"
          onChange=     {this.handleChange}
          defaultValue= {this.props.value}
          value=        {this.props.value}
          ref=          {this.props.name}
          id=           {`${this.props.name}_${this.props.sourceId}`}>
        </textarea>
        { this.props.newsEditableFieldToolbar }
      </div>
    )
  }
})
