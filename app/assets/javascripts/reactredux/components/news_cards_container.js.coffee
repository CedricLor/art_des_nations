########################################
## NewsCardContainer Component
########################################
NewsCardsContainer = React.createClass
  displayName: "NewsCardsContainer"

  createCards: ->
    `NewsCard = require('./news_card.js.coffee').NewsCard`
    for card, i in @props.articles
      element = React.createElement NewsCard,
        key: i
      #   # cardImageSource: card.dataset.imageSrc
        card:                             card
        # from local getDefaultProps of news_index_page (to be refactored)
        articlesPassedInUiProps:          @props.articlesPassedInUiProps
      #   # cardBtnTarget: card.dataset.btnTarget
        cardNumber: i
        # redux actions
        articlesActions:                  @props.articlesActions
        articlesFieldsActions:            @props.articlesFieldsActions
        articlesSizingPositionningActions: @props.articlesSizingPositionningActions
        # redux passed in Edit and Wip States
        articlesWIPStatesOfFields:        @props.articlesWIPStatesOfFields[card.id]
        articlesEditStates:               @props.articlesEditStates[card.id]
        # redux passedInDomProps
        articlesDOMProps:                 @props.articlesDOMProps[card.id]
        # redux global site edit mode
        siteEditMode:                     @props.siteEditMode
      element

  render: ->
    cards = @createCards()
    `ArticleForm = require('./article_form.js.coffee').ArticleForm`

    DOM.div
      className: "container-fluid"
      DOM.div
        className: "row"
        cards


`module.exports = {
  NewsCardsContainer: NewsCardsContainer
};`
