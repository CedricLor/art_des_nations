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

  getInitialState: ->
    edit: false

  # Card equalization
  componentDidMount: ->
    callback = ( ->
      height = @refs[@props.cardNumber].clientHeight
      @props.myHeightIs height, @props.cardNumber).bind(@)
    setTimeout callback, 0

  # admin
  handleDelete: (e) ->
    e.preventDefault()
    @props.admin_functions.destroy.function(@props.card)

  handleToggle: (e) ->
    e.preventDefault()
    @props.admin_functions.toggle_edit.function(@props.card.id)

  handleUpdate: (e) ->
    e.preventDefault()
    @props.admin_functions.update.function(@refs, @props.card)
  ####

  toolbar_on_read_only: ->
    DOM.div
      className: "news-toolbar"
      DOM.a
        className: 'btn btn-danger'
        onClick: @handleDelete
        @props.admin_functions.destroy.text
      React.DOM.a
        className: 'btn btn-default'
        onClick: @handleToggle
        @props.admin_functions.edit.text

  toolbar_on_edit: ->
    DOM.div
      className: "news-toolbar"
      React.DOM.a
        className: 'btn btn-default'
        onClick: @handleToggle
        "Cancel"
      DOM.a
        className: 'btn btn-danger'
        onClick: @handleUpdate
        "Update"

  title_editable: ->
    React.DOM.input
      key: 'title_editable'
      className: 'form-control'
      type: 'text'
      defaultValue: @props.card.title
      ref: 'title'

  title_read_only: ->
    DOM.a
      key: 'title_read_only'
      href: @props.cardBtnTarget
      DOM.h3
        style:
          marginTop: 0 if @props.cardImageSource == ""
        @props.card.title

  teaser_editable: ->
    React.DOM.input
      key: 'teaser_editable'
      className: 'form-control'
      type: 'text'
      defaultValue: @props.card.teaser
      ref: 'teaser'

  teaser_read_only: ->
    DOM.div
      key: 'teaser_read_only'
      className: "teaser"
      dangerouslySetInnerHTML: @rawMarkup(@props.card.teaser)

  render: ->
    DOM.div
      className: "news-listing #{@props.colClasses}"
      DOM.div
        className: "thumbnail outer-wrapper-news-div"
        # Card equalization
        style:
          minHeight: "0px"
        ####
        # admin
        if @props.passedInStates.edit
          @toolbar_on_edit()
        else
          @toolbar_on_read_only()
        ####
        DOM.div
          className: "inner-wrapper-news-div"
          # Card equalization
          ref: @props.cardNumber
          style:
            minHeight: @props.minHeightOfInnerWrapper
          ####
          # content / image
          DOM.a
            className: "news-anchor-link-wrapper"
            href: @props.cardBtnTarget
            if @props.cardImageSource != ""
              React.createElement Image,
                cardImageSource: @props.cardImageSource
                newsTitle: @props.newsTitle
            DOM.div
              className: "news-picture-overlay"
          ####
          # content / Title and teaser
          DOM.div
            className: "news-teaser-wrapper"
            if @props.passedInStates.edit
              [ @title_editable(), @teaser_editable() ]
            else
              [ @title_read_only(), @teaser_read_only() ]
          ####
        # Readmore button
        DOM.p
          className: "btn-container read-more-news-btn-container"
          DOM.a
            href: @props.cardBtnTarget
            className: "btn btn-lg black-square-btn news-read-more-btn"
            @props.localizedReadMore
        ####

`module.exports = {
  NewsCard: NewsCard
};`
