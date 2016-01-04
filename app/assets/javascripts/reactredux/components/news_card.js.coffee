`
window.React = require('react');
window.DOM = React.DOM
`

# `NewsEditableFieldToolbar = require('./news_editable_field_toolbar.js.coffee').NewsEditableFieldToolbar`
`
NewsTitleTeaserZone = require('./lower_news_components/news_content_components/news_title_teaser_zone.js.coffee').NewsTitleTeaserZone;
NewsToolbar = require('./lower_news_components/news_edit_tools/news_toolbar.js.coffee').NewsToolbar;
NewsImage = require('./lower_news_components/news_content_components/image.jsx').NewsImage
`

`
Link = require('react-router').Link
`

########################################
## Card Component
########################################
NewsCard = React.createClass

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
      viewType:                    "indexView",
      name:                        fieldName,
      card:                        @props.card,
      articlesPassedInUiProps:     @props.articlesPassedInUiProps,
      # redux store properties
      siteEditMode:                @props.siteEditMode,
      articlesEditStates:          @props.articlesEditStates,
      articlesWIPStatesOfFields:   @props.articlesWIPStatesOfFields,
      # unset properties
      cardImageSource:             @props.cardImageSource,
      # redux actions
      articlesFieldsActions:       @props.articlesFieldsActions,
      # local functions
      handleUpdate:                @handleUpdate

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

        # Article edit toolbar
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

          # Content / image
          React.createElement Link,
            className: "news-anchor-link-wrapper"
            to: "/article/#{@props.card.id}"
            # if @props.cardImageSource != ""
            React.createElement NewsImage,
              cardImageSource: @props.cardImageSource,
              newsTitle:       @props.newsTitle
            DOM.div
              className: "news-picture-overlay"
          ####

          # Content / Title and teaser
          DOM.div
            className: "news-teaser-wrapper"
            @createFieldZone(fieldName) for fieldName in ["title", "teaser"]
          ####

        # Readmore button
        DOM.p
          className: "btn-container read-more-news-btn-container"

          React.createElement Link,
            to: "/article/#{@props.card.id}"
            className: "btn btn-lg black-square-btn news-read-more-btn"
            @props.articlesPassedInUiProps.localizedReadMore
        ####

`module.exports = {
  NewsCard: NewsCard
};`
