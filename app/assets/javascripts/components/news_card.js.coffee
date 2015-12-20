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

NewsCard = React.createClass
  displayName: "NewsCard"

  rawMarkup: (raw) ->
    { __html: raw }

  # Card equalization
  componentDidMount: ->
    callback = ( ->
      height = @refs[@props.cardNumber].clientHeight
      @props.myHeightIs height, @props.cardNumber).bind(@)
    setTimeout callback, 0
  ####

  render: ->
    DOM.div
      className: "news-listing #{@props.colClasses}"
      DOM.div
        className: "thumbnail outer-wrapper-news-div"
        # Card equalization
        style:
          minHeight: "0px"
        ####
        DOM.div
          className: "inner-wrapper-news-div"
          # Card equalization
          ref: @props.cardNumber # check if ref can be key
          style:
            minHeight: @props.minHeightOfInnerWrapper
          ####
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

`module.exports = {
  NewsCard: NewsCard
};`
