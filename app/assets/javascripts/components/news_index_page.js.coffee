ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

NewsIndexPage = React.createClass
  displayName: "NewsIndexPage"

  getInitialState: ->
    #### new article management
    articles: @props.articles
    new_article: @blankNewArticle()
    #### end new article management

  ###### new article management
  blankNewArticle: ->
    {
      article_data: {
        title: '',
        teaser: '',
        body: ''
        },
      article_form_functions: {
        handleSubmitNewArticle: @handleSubmitNewArticle,
        handleChangeInFieldsOfNewArticle: @handleChangeInFieldsOfNewArticle
      }
    }

  createBlankNewArticle: ->
    blank_article = @blankNewArticle()
    @setState new_article: blank_article

  addNewArticle: (article) ->
    articles = @state.articles.slice()
    articles.unshift article
    @setState articles: articles

  handleSubmitNewArticle: ->
    $.post '', { article: @state.new_article.article_data }, (data) =>
      @addNewArticle data
      @createBlankNewArticle()
    , 'JSON'

  handleChangeInFieldsOfNewArticle: (e) ->
    new_article = @state.new_article
    new_article.article_data[e.target.name] = e.target.value
    @setState new_article: new_article
  ###### end new article management

  render: ->
    `NewsCardsContainer = require('./news_cards_container.js.coffee').NewsCardsContainer`

    DOM.div
      className: "news-index-page-body"
      React.createElement ReactCSSTransitionGroup,
        transitionName: "react-news-container"
        transitionEnterTimeout: 300
        transitionLeaveTimeout: 300
        transitionAppear: true
        transitionAppearTimeout: 4000
        React.createElement NewsCardsContainer,
          domElements: @state.articles
          localizedReadMore: "Read more"
          colClasses: "col-xs-12 col-sm-6 col-md-4"
          new_article: @state.new_article

`module.exports = {
  NewsIndexPage: NewsIndexPage
};`
