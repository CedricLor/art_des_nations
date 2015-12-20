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
      className: "row "
      @props.cards_for_row

########################################
## NewsCardContainer Component
########################################
NewsCardsContainer = React.createClass
  displayName: "NewsCardsContainer"

  # Card equalization
  arrayBuilder: (chunk_size) ->
    empty_div_height_array = []
    for i in [1..@props.domElements.length] by chunk_size
      empty_div_height_array.push(0)
    empty_div_height_array

  numberOfCardsByRow: ->
    if window.innerWidth >= 992 then 3 else if window.innerWidth >= 768 then 2

  getInitialState: ->
    cardByRows: @numberOfCardsByRow()
    heightOfRows: []
    heightOfRowsByChunksOf:
      2: @arrayBuilder(2)
      3: @arrayBuilder(3)
    pending: true

  handleResize: ->
    cardByRows = @numberOfCardsByRow()
    @setState cardByRows: cardByRows
    @forceUpdate()

  componentDidMount: ->
    window.addEventListener('resize', @handleResize)

  componentWillUnmount: ->
    window.removeEventListener('resize', @handleResize);

  storeDivHeight: (height, card_index) ->
    heightOfRows = @state.heightOfRows
    heightOfRows[card_index] = height
    @setState heightOfRows: heightOfRows

  inWhichRowIsTheCardByRowOf: (number_of_cards_by_row, index) ->
    rindex = index + 1
    row = if rindex % number_of_cards_by_row == 0 then rindex / number_of_cards_by_row - 1 else Math.floor(rindex / number_of_cards_by_row)

  setRequiredHeightOfRowsOnRender: (card_index) ->
    my_row_index = @inWhichRowIsTheCardByRowOf(@state.cardByRows, card_index)
    heights_of_cards_in_same_row = @state.heightOfRows.slice(my_row_index*3, (my_row_index*3)+3)
    required_min_height = 0
    for height in heights_of_cards_in_same_row
      required_min_height = height if height > required_min_height
    required_min_height
  #######

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
    for card, i in @props.domElements
      if @state.heightOfRows.length == @props.domElements.length then required_min_height = @setRequiredHeightOfRowsOnRender(i) else required_min_height = 0
      element = React.createElement NewsCard,
        key: i
      #   # cardImageSource: card.dataset.imageSrc
        newsTitle: card.title
        newsTeaser: card.teaser
        localizedReadMore: @props.localizedReadMore
      #   # cardBtnTarget: card.dataset.btnTarget
        colClasses: @props.colClasses
        # Card equalization
        cardNumber: i
        myHeightIs: @storeDivHeight
        minHeightOfInnerWrapper: required_min_height
        # Card equalization
      element

  render: ->
    cards = @createCards()
    # cards_in_rows = @wrapCardsInRows cards

    DOM.div
      className: "container-fluid"
      DOM.div
        className: "row"
        cards


`module.exports = {
  NewsCardsContainer: NewsCardsContainer
};`

