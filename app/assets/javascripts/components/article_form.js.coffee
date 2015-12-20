ArticleForm = React.createClass
    handleChange: (e) ->
      @props.handleChange(e)

    handleSubmit: (e) ->
      e.preventDefault()
      @props.handleSubmitNewArticle()

    valid: ->
      @props.new_article.title && @props.new_article.teaser && @props.new_article.body

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
            value: @props.new_article.title
            onChange: @handleChange
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'text'
            className: 'form-control'
            placeholder: 'Teaser'
            name: 'teaser'
            value: @props.new_article.teaser
            onChange: @handleChange
        React.DOM.div
          className: 'form-group'
          React.DOM.input
            type: 'text'
            className: 'form-control'
            placeholder: 'Body'
            name: 'body'
            value: @props.new_article.body
            onChange: @handleChange
        React.DOM.button
          type: 'submit'
          className: 'btn btn-primary'
          disabled: !@valid()
          'Create article'

`module.exports = {
  ArticleForm: ArticleForm
};`
