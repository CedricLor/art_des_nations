import { NewsEditableFieldToolbar } from './news_editable_field_toolbar';

export const NewsCkEditor = React.createClass({
  getInitialState() {
    return {
      "myCkeditor": ""
    }
  },

  componentDidMount() {
    let myCkeditor = CKEDITOR.replace( `${this.props.name}_${this.props.card.id}`, {
      allowedContent : true,
      pasteFromWordRemoveFontStyles : false,
      pasteFromWordRemoveStyles : false
      });
    myCkeditor.on( 'change', (evt) => {
      console.log( 'Total bytes: ' + evt.editor.getData().length );
      this.pushChangesUp(evt.editor.getData());
    });
    // console.log(CKEDITOR.instances[`${this.props.name}_${this.props.card.id}`].getData());
    // console.log("called");
    // console.log(this.state);
  },

  componentWillUnmout() {
    CKEDITOR.instances[`${this.props.name}_${this.props.card.id}`].destroy();
  },

  pushChangesUp(newText) {
    const [fieldName, fieldValue] = [this.props.name, newText];
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue);
  },

  handleChange(e) {
    const [fieldName, fieldValue] = [e.target.name, e.target.value];
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue);
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
          defaultValue= {this.props.card[this.props.name]}
          value=        {this.props.card[this.props.name]}
          ref=          {this.props.name}
          name=         {this.props.name}
          id=           {`${this.props.name}_${this.props.card.id}`}>
        </textarea>
        <NewsEditableFieldToolbar
          forFieldName=                {this.props.name}
          card=                        {this.props.card}
          articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
          articlesWIPStatesOfFields=   {this.props.articlesWIPStatesOfFields}
          articlesFieldsActions=       {this.props.articlesFieldsActions}
          handleUpdate=                {this.props.handleUpdate}
          handleEditField=             {this.props.handleEditField}
          handleDeleteText=            {this.props.handleDeleteText}
          handleRestoreText=           {this.props.handleRestoreText}/>
        <div>
          { this.state["myCkeditor"] }
        </div>
      </div>
    )
  }
})
