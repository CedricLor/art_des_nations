import React, {PropTypes} from 'react';
import NewsEditableFieldToolbar from './commons/news_editable_field_toolbar';

export const NewsCkEditor = React.createClass({
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
