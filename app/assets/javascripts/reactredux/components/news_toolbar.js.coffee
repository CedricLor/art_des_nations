########################################
## NewsToolbar Component
########################################
NewsToolbar = React.createClass
  displayName: "NewsToolbar"

  toolbarOnReadOnly: ->
    DOM.div
      className: "news-toolbar"
      name: "buttons_#{@props.cardNumber}_for_article"
      DOM.a
        className: 'btn btn-danger'
        onClick: @props.handleDelete
        @props.articlesPassedInUiProps.destroy.text
      DOM.a
        className: 'btn btn-default'
        onClick: @props.handleEdit
        @props.articlesPassedInUiProps.editArticle.text

  toolbarOnEdit: ->
    DOM.div
      className: "news-toolbar"
      name: "buttons_#{@props.cardNumber}_for_article"
      DOM.a
        className: 'btn btn-default'
        onClick: @props.handleCancel
        @props.articlesPassedInUiProps.cancelEditArticle.text
      DOM.a
        name: "save_button_#{@props.cardNumber}_for_article"
        className: 'btn btn-danger'
        onClick: @props.handleUpdate
        @props.articlesPassedInUiProps.update.text

  render: ->
      if @props.articlesEditStates.article
        @toolbarOnEdit(@props.cardNumber)
      else
        @toolbarOnReadOnly(@props.cardNumber)


`module.exports = {
  NewsToolbar: NewsToolbar
};`
