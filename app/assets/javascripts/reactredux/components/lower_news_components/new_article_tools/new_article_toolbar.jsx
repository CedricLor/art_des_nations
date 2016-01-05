import React from 'react';

// ########################################
// ## NewsToolbar Component
// ########################################
export const NewArticleToolbar = React.createClass({

  toolbarOnReadOnly() {
    return (
      <div
        className= "news-toolbar"
        name=      {`buttons_${this.props.card.id}_for_article`}>
        <a
          className= 'btn btn-danger'
          onClick=   {this.props.handleDelete}>
          {this.props.articlesPassedInUiProps.destroy.text}
        </a>
        <a
          className= 'btn btn-default'
          onClick=   {this.props.handleEdit}>
          {this.props.articlesPassedInUiProps.editArticle.text}
        </a>
      </div>
    )
  },

  toolbarOnEdit() {
    return (
      <div
        className= "news-toolbar"
        name=      {`buttons_${this.props.card.id}_for_article`}>
        <a
          className= 'btn btn-default'
          onClick=   {this.props.handleCancel}>
          {this.props.articlesPassedInUiProps.cancelEditArticle.text}
        </a>
        <a
          name=      "save_button_#{@props.card.id}_for_article"
          className= 'btn btn-danger'
          onClick=   {this.props.handleEdit}>
          {this.props.articlesPassedInUiProps.update.text}
        </a>
      </div>
    )
  },

  render() {
    let toolBarToCreate
    if (this.props.articlesEditStates.article) {
      toolBarToCreate = this.toolbarOnEdit
    }
    else {
      toolBarToCreate = this.toolbarOnReadOnly
    }

    return (
      { toolBarToCreate }
    )
  }
})

