########################################
## NewsCardContainer Component
########################################
NewsCardsContainer = React.createClass
  displayName: "NewsCardsContainer"

  createCards: ->
    `NewsCard = require('./news_card.js.coffee').NewsCard`
    for card, i in @props.domElements.data
      element = React.createElement NewsCard,
        key: i
      #   # cardImageSource: card.dataset.imageSrc
        card: card
        passedInUiPropsForArticles: @props.passedInUiPropsForArticles
      #   # cardBtnTarget: card.dataset.btnTarget
        cardNumber: i
        display_functions: @props.domElements.display_functions
        admin_functions: @props.domElements.admin_functions
        passedInStates: @props.domElements.articles_states[card.id]
        passedInDomProps: _.find(@props.domElements.articles_dom_props, { article_id: card.id })
        siteEditMode: @props.siteEditMode
      element

  newArticleForm: ->
    DOM.div
      key: "new_article_form"
      className: "row"
      DOM.div
        className: "col-xs-12"
        React.createElement ArticleForm,
          new_article: @props.new_article

  newArticleHr: ->
    React.DOM.hr
      key: "hr_for_new_article_form"

  render: ->
    cards = @createCards()
    `ArticleForm = require('./article_form.js.coffee').ArticleForm`

    DOM.div
      className: "container-fluid"
      if @props.siteEditMode.mode
        [@newArticleForm(), @newArticleHr()]
      DOM.div
        className: "row"
        cards


`module.exports = {
  NewsCardsContainer: NewsCardsContainer
};`
