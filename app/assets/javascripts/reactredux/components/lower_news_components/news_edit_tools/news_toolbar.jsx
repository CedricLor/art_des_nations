import React from 'react';
import { NewsToolbarReusable } from './news_toolbar_reusable';

// ########################################
// ## NewsToolbar Component
// ########################################
export const NewsToolbar = React.createClass({

  toolbarOnReadOnly() {
    return [
      this.props.handleDelete,
      this.props.articlesPassedInUiProps.destroy.text,
      "btn-danger",
      this.props.handleEdit,
      this.props.articlesPassedInUiProps.editArticle.text,
      "btn-default"
    ]
  },

  toolbarOnEdit() {
    return [
      this.props.handleCancel,
      this.props.articlesPassedInUiProps.cancelEditArticle.text,
      "btn-default",
      this.props.handleUpdate,
      this.props.articlesPassedInUiProps.update.text,
      "btn-danger"
    ]
  },

  toolbarSwitch() {
    if (this.props.articlesEditStates.article) {
      return this.toolbarOnEdit()
    }
    else {
      return this.toolbarOnReadOnly()
    }
  },

  render() {
    const [
      functionForFirstBtn,
      textForFirstBtn,
      classNameForFirstBtn,
      functionForSecondBtn,
      textForSecondBtn,
      classNameForSecondBtn
    ] = this.toolbarSwitch()

    return (
      <NewsToolbarReusable
        parentIdentification=    {this.props.parentIdentification}
        functionForFirstButton=  {functionForFirstBtn}
        textForFirstButton=      {textForFirstBtn}
        classNameForFirstBtn=    {classNameForFirstBtn}
        functionForSecondButton= {functionForSecondBtn}
        textForSecondButton=     {textForSecondBtn}
        classNameForSecondBtn=   {classNameForSecondBtn}
      />
    )
  }
})




// window.React = require('react');
// window.DOM = React.DOM;

// ########################################
// ## NewsToolbar Component
// ########################################
// NewsToolbar = React.createClass

//   toolbarOnReadOnly: ->
//     DOM.div
//       className: "news-toolbar"
//       name: "buttons_#{@props.card.id}_for_article"
//       DOM.a
//         className: 'btn btn-danger'
//         onClick: @props.handleDelete
//         @props.articlesPassedInUiProps.destroy.text
//       DOM.a
//         className: 'btn btn-default'
//         onClick: @props.handleEdit
//         @props.articlesPassedInUiProps.editArticle.text

//   toolbarOnEdit: ->
//     DOM.div
//       className: "news-toolbar"
//       name: "buttons_#{@props.card.id}_for_article"
//       DOM.a
//         className: 'btn btn-default'
//         onClick: @props.handleCancel
//         @props.articlesPassedInUiProps.cancelEditArticle.text
//       DOM.a
//         name: "save_button_#{@props.card.id}_for_article"
//         className: 'btn btn-danger'
//         onClick: @props.handleUpdate
//         @props.articlesPassedInUiProps.update.text

//   render: ->
//       if @props.articlesEditStates.article
//         @toolbarOnEdit()
//       else
//         @toolbarOnReadOnly()


// `module.exports = {
//   NewsToolbar: NewsToolbar
// };`
