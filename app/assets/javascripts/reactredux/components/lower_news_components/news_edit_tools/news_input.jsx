import { NewsEditableFieldToolbar } from './news_editable_field_toolbar';

export const NewsInput = React.createClass({

  handleChange(e) {
    const [fieldName, fieldValue] = [e.target.name, e.target.value];
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue)  ;
  },

  render() {
    return (
      <div
        className= 'input-group'
        key=       {`${this.props.name}_editable`}>
        <input
          className=    'form-control'
          type=         {this.props.type}
          onChange=     {this.handleChange}
          defaultValue= {this.props.card[this.props.name]}
          value=        {this.props.card[this.props.name]}
          ref=          {this.props.name}
          name=         {this.props.name}/>
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
      </div>
    )
  }
})
