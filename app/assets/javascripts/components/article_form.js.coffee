ArticleForm = React.createClass
    handleChange: (e) ->
      @props.new_article.article_form_functions.handleChangeInFieldsOfNewArticle(e)

    handleSubmit: (e) ->
      e.preventDefault()
      @props.new_article.article_form_functions.handleSubmitNewArticle()

    valid: ->
      @props.new_article.article_data.title && @props.new_article.article_data.teaser && @props.new_article.article_data.body

    render: ->
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
            value: @props.new_article.article_data.title
            onChange: @handleChange
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'text'
            className: 'form-control'
            placeholder: 'Teaser'
            name: 'teaser'
            value: @props.new_article.article_data.teaser
            onChange: @handleChange
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'text'
            className: 'form-control'
            placeholder: 'Body'
            name: 'body'
            value: @props.new_article.article_data.body
            onChange: @handleChange
        React.DOM.button
          type: 'submit'
          className: 'btn btn-primary'
          disabled: !@valid()
          'Create article'

`module.exports = {
  ArticleForm: ArticleForm
};`
