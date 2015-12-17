ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
DOM = React.DOM

NewsIndexPage = React.createClass
  displayName: "NewsContainer"

  render: ->
    card_container = React.createElement CardContainer,
      domElements: @props.articles
      localizedReadMore: "Read more"
      colClasses: "col-xs-12 col-sm-6 col-md-4"
      clearFixClassesForTwoCards: "visible-sm"
      clearFixClassesForThreeCards: "hidden-sm hidden-xs"
      clearFixClassesForFourCards: "hidden-md hidden-sm hidden-xs"

    card_container_with_transition = React.createElement(
      ReactCSSTransitionGroup
      transitionName: "react-news-container"
      transitionEnterTimeout: 300
      transitionLeaveTimeout: 300
      transitionAppear: true
      transitionAppearTimeout: 4000
      card_container
    )

    DOM.div
      className: "fluid-container"
      card_container_with_transition

rawMarkup = (raw) ->
  { __html: raw }

########################################
## ClearFixSm Component
########################################
ClearFix = React.createClass
  displayName: "ClearFix"

  render: ->
    DOM.div
      className: "clearfix #{@props.clearFixClasses}"
      dangerouslySetInnerHTML: rawMarkup("&nbsp;")


########################################
## Image Component
########################################
Image = React.createClass
  displayName: "Image"

  render: ->
    DOM.img
      src: @props.cardImageSource
      alt: @props.newsTitle

########################################
## Card Component
########################################
Card = React.createClass
  displayName: "Card"

  componentDidMount: ->
    callback = ( ->
      height = @refs[@props.cardNumber].clientHeight
      @props.myHeightIs height, @props.cardNumber).bind(@)
    setTimeout callback, 0

  rawMarkup: (raw) ->
    { __html: raw }

  render: ->
    DOM.div
      className: "news-listing #{@props.colClasses}"
      DOM.div
        className: "thumbnail outer-wrapper-news-div"
        style:
          minHeight: "0px"
        DOM.div
          className: "inner-wrapper-news-div"
          ref: @props.cardNumber
          style:
            minHeight: @props.minHeightOfInnerWrapper
          DOM.a
            className: "news-anchor-link-wrapper"
            href: @props.cardBtnTarget
            if @props.cardImageSource != ""
              React.createElement Image,
                cardImageSource: @props.cardImageSource
                newsTitle: @props.newsTitle
            DOM.div
              className: "news-picture-overlay"
          DOM.div
            className: "news-teaser-wrapper"
            DOM.a
              href: @props.cardBtnTarget
              DOM.h3
                style:
                  marginTop: 0 if @props.cardImageSource == ""
                @props.newsTitle
            DOM.div
              className: "teaser"
              dangerouslySetInnerHTML: @rawMarkup(@props.newsTeaser)
        DOM.p
          className: "btn-container read-more-news-btn-container"
          DOM.a
            href: @props.cardBtnTarget
            className: "btn btn-lg black-square-btn news-read-more-btn"
            @props.localizedReadMore

########################################
## CardContainer Component
########################################
CardContainer = React.createClass
  displayName: "CardContainer"

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
    @setState cardByRows: @numberOfCardsByRow()
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

  createClearFix: (i) ->
    if @props.clearFixClassesForTwoCards && i %% 2 == 0
      clearFixSm = React.createElement ClearFix,
        key: "clear-fix-sm-#{i}"
        clearFixClasses: @props.clearFixClassesForTwoCards
    if @props.clearFixClassesForThreeCards && i %% 3 == 0
      clearFixMd = React.createElement ClearFix,
        key: "clear-fix-md-#{i}"
        clearFixClasses: @props.clearFixClassesForThreeCards
    if @props.clearFixClassesForFourCards && i %% 4 == 0
      console.log("hello")
      clearFixLg = React.createElement ClearFix,
        key: "clear-fix-lg-#{i}"
        clearFixClasses: @props.clearFixClassesForFourCards
    [clearFixSm, clearFixMd, clearFixLg]

  createCards: ->
    for card, i in @props.domElements
      if @state.heightOfRows.length == @props.domElements.length then required_min_height = @setRequiredHeightOfRowsOnRender(i) else required_min_height = 0
      element = React.createElement Card,
        key: i
        # cardImageSource: card.dataset.imageSrc
        newsTitle: card.title
        newsTeaser: card.teaser
        localizedReadMore: @props.localizedReadMore
        # cardBtnTarget: card.dataset.btnTarget
        cardNumber: i
        colClasses: @props.colClasses
        myHeightIs: @storeDivHeight
        minHeightOfInnerWrapper: required_min_height
      clearfix = @createClearFix(i + 1)
      [element, clearfix]

  render: ->
    @setRequiredHeightsOfAllTheRows if @state.heightOfRows.length == @props.domElements.length && @state.pending == true
    cards = @createCards()
    DOM.div
      className: "row"
      cards


`module.exports = {
  NewIndexPage: NewsIndexPage
};`
