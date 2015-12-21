########################################
## Helpers Functions
########################################

########################################
## NewsBtstpRow Component
########################################
NewsBtstpRow = React.createClass
  displayName: "NewsBtstpRow"

  render: ->
    DOM.div
      className: "row"
      @props.cards_for_row

########################################
## NewsCardContainer Component
########################################
NewsCardsContainer = React.createClass
  displayName: "NewsCardsContainer"

  createCards: ->
    `NewsCard = require('./news_card.js.coffee').NewsCard`
    for card, i in @props.domElements.data
      # if @props.div_equalization_params.heightOfRows.length == @props.domElements.data.length then required_min_height = @props.div_equalization_params.setRequiredHeightOfRowsOnRender(i) else required_min_height = 0
      element = React.createElement NewsCard,
        key: i
      #   # cardImageSource: card.dataset.imageSrc
        card: card
        localizedReadMore: @props.localizedReadMore
      #   # cardBtnTarget: card.dataset.btnTarget
        colClasses: @props.colClasses
        cardNumber: i
        admin_functions: @props.domElements.admin_functions
        display_functions: @props.domElements.display_functions
        passedInStates: @props.domElements.articles_states[card.id]
        passedInDomProps: _.find(@props.domElements.articles_dom_props, { article_id: card.id })
      element

  render: ->
    cards = @createCards()
    `ArticleForm = require('./article_form.js.coffee').ArticleForm`

    DOM.div
      className: "container-fluid"
      DOM.div
        className: "row"
        DOM.div
          className: "col-xs-12"
          React.createElement ArticleForm,
            new_article: @props.new_article
      React.DOM.hr null
      DOM.div
        className: "row"
        cards


`module.exports = {
  NewsCardsContainer: NewsCardsContainer
};`
