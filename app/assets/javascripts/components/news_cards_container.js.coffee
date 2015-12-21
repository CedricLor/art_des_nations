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

  # wrapCardsInRow: (cards_for_row, row_index) ->
  #   React.createElement NewsBtstpRow,
  #     key: row_index
  #     cards_for_row: cards_for_row

  # wrapCardsInRows: (cards) ->
  #   articles = cards
  #   rows_of_articles = []
  #   i = 0
  #   while i < cards.length
  #     row_of_12 = @wrapCardsInRow articles.slice(i, i + 12), i
  #     rows_of_articles.push(row_of_12)
  #     i += 12
  #   rows_of_articles

  createCards: ->
    `NewsCard = require('./news_card.js.coffee').NewsCard`
    for card, i in @props.domElements.data
      if @props.div_equalization_params.heightOfRows.length == @props.domElements.data.length then required_min_height = @props.div_equalization_params.setRequiredHeightOfRowsOnRender(i) else required_min_height = 0
      element = React.createElement NewsCard,
        key: i
      #   # cardImageSource: card.dataset.imageSrc
        card: card
        localizedReadMore: @props.localizedReadMore
      #   # cardBtnTarget: card.dataset.btnTarget
        colClasses: @props.colClasses
        # Card equalization
        cardNumber: i
        myHeightIs: @props.div_equalization_params.storeDivHeight
        minHeightOfInnerWrapper: required_min_height
        admin_functions: @props.domElements.admin_functions
        passedInStates: @props.domElements.articles_states[card.id]
      element

  render: ->
    cards = @createCards()
    # cards_in_rows = @wrapCardsInRows cards
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
