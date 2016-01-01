ArticleForm = React.createClass
    handleChange: (e) ->
      @props.newArticleActions.changeNewArticleFields(e.target.name, e.target.value)

    handleSubmit: (e) ->
      e.preventDefault()
      @props.newArticleActions.handleSubmitNewArticle()

    valid: ->
      @props.newArticleFields.title && @props.newArticleFields.teaser && @props.newArticleFields.body

    render: ->
      DOM.div
        key: "new_article_form"
        className: "row"
        DOM.div
          className: "col-xs-12"
          DOM.hr null
          React.DOM.form
            className: 'form-inline'
            onSubmit: @handleSubmit
            React.DOM.div
              className: 'form-group'
              React.DOM.input
                type: 'text'
                className: 'form-control'
                placeholder: 'Title'
                name: 'title'
                value: @props.newArticleFields.title
                onChange: @handleChange
            React.DOM.div
              className: 'form-group'
              React.DOM.input
                type: 'text'
                className: 'form-control'
                placeholder: 'Teaser'
                name: 'teaser'
                value: @props.newArticleFields.teaser
                onChange: @handleChange
            React.DOM.div
              className: 'form-group'
              React.DOM.input
                type: 'text'
                className: 'form-control'
                placeholder: 'Body'
                name: 'body'
                value: @props.newArticleFields.body
                onChange: @handleChange
            React.DOM.button
              type: 'submit'
              className: 'btn btn-primary'
              disabled: !@valid()
              'Create article'
          DOM.hr null

`module.exports = {
  ArticleForm: ArticleForm
};`
