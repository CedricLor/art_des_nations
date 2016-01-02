`window.React = require('react');
window.DOM = React.DOM
`

# `NewsEditableFieldToolbar = require('./news_editable_field_toolbar.js.coffee').NewsEditableFieldToolbar`
`NewsTitleTeaserZone = require('./news_title_teaser_zone.js.coffee').NewsTitleTeaserZone;
NewsImage = require('./image.jsx').NewsImage`

`Link = require('react-router').Link
RouteHandler = require('react-router').RouteHandler`


########################################
## Card Component
########################################
NewsCard = React.createClass

  # rawMarkup: (raw) ->
  #   { __html: raw }

  # Card equalization
  componentDidMount: ->
    callback = ( ->
      @props.articlesSizingPositionningActions.assignRealDomValuesToDOMPropsOfArticle @props.card.id,
        @refs["main_article_div_#{@props.card.id}"].getBoundingClientRect().top,
        @refs["#{@props.cardNumber}"].clientHeight,
        @props.cardNumber
    ).bind(@)
    setTimeout callback, 0

  componentDidUpdate: (nextProps) ->
    # callback = ( ->
    #   @props.articlesSizingPositionningActions.assignRealDomValuesToDOMPropsOfArticle @props.card.id,
    #     @refs["main_article_div_#{@props.card.id}"].getBoundingClientRect().top,
    #     @refs["#{@props.cardNumber}"].clientHeight,
    #     @props.cardNumber
    # ).bind(@)
    # setTimeout callback, 0 if nextProps.passedInStates.needs_resizing == true

  handleDelete: (e) ->
    e.preventDefault()
    @props.articlesActions.handleDeleteArticle(@props.card.id)

  handleEdit: (e) ->
    e.preventDefault()
    @props.articlesFieldsActions.changeArticleEditStateOfField(@props.card.id, 'article', true)

  handleCancel: (e) ->
    e.preventDefault()
    @props.articlesActions.handleCancelEditArticle(@props.card.id)

  handleUpdate: (e) ->
    e.preventDefault()
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    @props.articlesActions.handleUpdateArticle(@props.card.id, fieldName)

  newsToolbar: ->
    `NewsToolbar = require('./news_toolbar.js.coffee').NewsToolbar`
    React.createElement NewsToolbar,
      articlesPassedInUiProps: @props.articlesPassedInUiProps
      cardNumber:              @props.cardNumber,
      articlesEditStates:      @props.articlesEditStates,
      # local functions
      handleUpdate:            @handleUpdate,
      handleEdit:              @handleEdit,
      handleCancel:            @handleCancel,
      handleDelete:            @handleDelete,

  createFieldZone: (fieldName) ->
    React.createElement NewsTitleTeaserZone,
      key:                         "#{@props.cardNumber}_#{fieldName}",
      name:                        fieldName,
      card:                        @props.card,
      articlesPassedInUiProps:     @props.articlesPassedInUiProps,
      # redux store properties
      siteEditMode:                @props.siteEditMode,
      articlesEditStates:          @props.articlesEditStates,
      articlesWIPStatesOfFields:   @props.articlesWIPStatesOfFields,
      # unset properties
      cardBtnTarget:               @props.cardBtnTarget,
      cardImageSource:             @props.cardImageSource,
      # redux actions
      articlesFieldsActions:       @props.articlesFieldsActions
      # local functions
      handleUpdate:                @handleUpdate,

  render: ->
    DOM.div
      ref: "main_article_div_#{@props.card.id}"
      className: "news-listing #{@props.articlesPassedInUiProps.colClasses} "
      DOM.div
        className: "thumbnail outer-wrapper-news-div"
        # Card equalization
        style:
          minHeight: "0px"
        ####

        # article edit toolbar
        if @props.siteEditMode.mode
          @newsToolbar()
        ####
        DOM.div
          className: "inner-wrapper-news-div"

          # Card equalization
          ref: @props.cardNumber
          style:
            minHeight: @props.articlesDOMProps.reqDivHeight
          ####

          # content / image
          DOM.a
            className: "news-anchor-link-wrapper"
            href: @props.cardBtnTarget
            # if @props.cardImageSource != ""
            React.createElement NewsImage,
              cardImageSource: @props.cardImageSource,
              newsTitle:       @props.newsTitle
            DOM.div
              className: "news-picture-overlay"
          ####

          # content / Title and teaser
          DOM.div
            className: "news-teaser-wrapper"
            @createFieldZone(fieldName) for fieldName in ["title", "teaser"]
          ####

        # Readmore button
        DOM.p
          className: "btn-container read-more-news-btn-container"

          React.createElement Link,
            to: "/articles/article/#{@props.card.id}"
            className: "btn btn-lg black-square-btn news-read-more-btn"
            @props.articlesPassedInUiProps.localizedReadMore
          # DOM.a
          #   href: @props.cardBtnTarget
        ####

`module.exports = {
  NewsCard: NewsCard
};`
