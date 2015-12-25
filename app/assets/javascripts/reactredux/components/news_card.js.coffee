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
      @props.display_functions.getDomPropsForArticle @refs, @props.card.id, @props.cardNumber).bind(@)
    setTimeout callback, 0

  componentDidUpdate: (nextProps) ->
    # callback = ( ->
    #   @props.display_functions.getDomPropsForArticle @refs, @props.card.id, @props.cardNumber).bind(@)
    # setTimeout callback, 0 if nextProps.passedInStates.needs_resizing == true

  # admin
  handleToggle: (e) ->
    e.preventDefault()
    @props.admin_functions.toggleEditArticle.function(@props.card.id)

  handleCancel: (e) ->
    e.preventDefault()
    @props.admin_functions.cancelEditArticle.function(@props.card.id)

  handleUpdate: (e) ->
    e.preventDefault()
    fieldName = e.target.parentNode.name.match(/(_for_)(\S+)/)[2]
    @props.admin_functions.update.function(@refs, @props.card.id, fieldName)

  handleDelete: (e) ->
    e.preventDefault()
    @props.admin_functions.destroy.function(@props.card)

  handleToggleEditField: (e) ->
    e.preventDefault()
    fieldName = e.target.parentNode.name.match(/(_for_)(\S+)/)[2]
    @props.admin_functions.toggleEditField.function(fieldName, @props.card.id)

  handleChange: (e) ->
    [fieldName, fieldValue] = [e.target.name, e.target.value]
    @props.admin_functions.handleChangeInFieldsOfArticle.function(fieldName, fieldValue, @props.card.id, WIPStateVAlue = true)

  handleDeleteText: (e) ->
    e.preventDefault()
    [fieldName, fieldValue] = [e.target.parentNode.name.match(/(_for_)(\S+)/)[2], '']
    ReactDOM.findDOMNode(@refs[fieldName]).value = fieldValue
    @props.admin_functions.handleChangeInFieldsOfArticle.function(fieldName, fieldValue, @props.card.id, WIPStateVAlue = true)

  handleRestoreText: (e) ->
    e.preventDefault()
    fieldName = e.target.parentNode.name.match(/(_for_)(\S+)/)[2]
    @props.admin_functions.restoreText.function(fieldName, @props.card.id)

  ####
  toolbarOnReadOnly: ->
    DOM.div
      className: "news-toolbar"
      DOM.a
        className: 'btn btn-danger'
        onClick: @handleDelete
        @props.admin_functions.destroy.text
      DOM.a
        className: 'btn btn-default'
        onClick: @handleToggle
        @props.admin_functions.toggleEditArticle.text

  toolbarOnEdit: ->
    DOM.div
      className: "news-toolbar"
      name: "buttons_for_article"
      DOM.a
        className: 'btn btn-default'
        onClick: @handleCancel
        @props.admin_functions.cancelEditArticle.text
      DOM.a
        className: 'btn btn-danger'
        onClick: @handleUpdate
        @props.admin_functions.update.text

  editButton: (name) ->
    DOM.button
      className: 'btn'
      name: "edit_button_for_#{name}"
      onClick: @handleToggleEditField
      # FIXME: CSS
      style:
        backgroundColor: 'white'
      DOM.span
        className: 'glyphicon glyphicon-pencil'
        ariaHidden: 'true'
        # FIXME: CSS
        style:
          backgroundColor: 'white'

  deleteTextButton: (fieldName) ->
    DOM.button
      name: "delete_content_button_for_#{fieldName}"
      # FIXME - IN CSS
      style:
        backgroundColor: 'white'
        borderStyle: 'none'
        display: 'block'
        margin: 'auto'
      onClick: @handleDeleteText
      DOM.span
        @props.admin_functions.deleteText.text

  restoreTextButton: (fieldName) ->
    DOM.button
      name: "restore_content_button_for_#{fieldName}"
      # FIXME - IN CSS
      style:
        backgroundColor: 'white'
        borderStyle: 'none'
        display: 'block'
        margin: 'auto'
      onClick: @handleRestoreText
      DOM.span, null
        @props.admin_functions.restoreText.text

  exitEditFieldButton: (fieldName) ->
    DOM.button
      name: "exit_button_for_#{fieldName}"
      # FIXME - IN CSS
      style:
        backgroundColor: 'white'
        borderStyle: 'none'
        display: 'block'
        margin: 'auto'
      onClick: @handleToggleEditField
      DOM.span, null
        @props.admin_functions.exitEditField.text

  buttonsForEditable: (fieldName) ->
    DOM.div
      className: 'input-group-btn'
      DOM.button
        type: 'button'
        name: "save_button_for_#{fieldName}"
        className: 'btn btn-default'
        onClick: @handleUpdate
        DOM.span
          className: 'glyphicon glyphicon-floppy-save'
          ariaHidden: 'true'
      DOM.button
        type: 'button'
        className: 'btn btn-default dropdown-toggle'
        "data-toggle": 'dropdown'
        ariaHaspopup: 'true'
        ariaExpanded: 'false'
        DOM.span
          className: 'caret'
        DOM.span
          className: 'sr-only'
          'Toggle Dropdown'
      DOM.ul
        className: "dropdown-menu dropdown-menu-right"
        if @props.passedInStates.WIP[fieldName]
          DOM.li null,
            @restoreTextButton(fieldName)
        else
          DOM.li null,
            @exitEditFieldButton(fieldName)
        DOM.li null,
          DOM.hr
            # FIXME - IN CSS
            style:
              marginTop: '5px'
              marginBottom: '5px'
        DOM.li null,
          @deleteTextButton(fieldName)

  titleEditable: ->
    DOM.div
      className: 'input-group'
      key: 'title_editable'
      DOM.input
        className: 'form-control'
        type: 'text'
        defaultValue: @props.card.title
        ref: 'title'
        name: 'title'
        onChange: @handleChange
      @buttonsForEditable('title')

  teaserEditable: ->
    DOM.div
      className: 'input-group'
      key: 'teaser_editable'
      DOM.input
        className: 'form-control'
        type: 'text'
        defaultValue: @props.card.teaser
        ref: 'teaser'
        name: 'teaser'
        onChange: @handleChange
      @buttonsForEditable('teaser')

  titleReadOnly: ->
    DOM.a
      key: 'title_read_only'
      href: @props.cardBtnTarget
      DOM.h3
        style:
          marginTop: 0 if @props.cardImageSource == ""
        style:
          display: "inline-block" if @props.siteEditMode.mode
        @props.card.title
      # if site edit mode on, show edit tools
      if @props.siteEditMode.mode
        # if field edit mode on, show form and field edit tools
        if @props.passedInStates.edit.title
          @titleEditable()
        # else show pencil button
        else
          @editButton('title')

  teaserReadOnly: ->
    DOM.div
      key: 'teaser_read_only'
      DOM.div
        className: "teaser"
        style:
          display: "inline-block" if @props.siteEditMode.mode
        dangerouslySetInnerHTML: @rawMarkup(@props.card.teaser)
      # if site edit mode on, show edit tools
      if @props.siteEditMode.mode
        # if field edit mode on, show form and field edit tools
        if @props.passedInStates.edit.teaser
          @teaserEditable()
        # else show pencil button
        else
          @editButton('teaser')

  render: ->
    DOM.div
      ref: "main_article_div_#{@props.card.id}"
      className: "news-listing #{@props.passedInUiPropsForArticles.colClasses} "
      DOM.div
        className: "thumbnail outer-wrapper-news-div"
        # Card equalization
        style:
          minHeight: "0px"
        ####

        # article edit toolbar
        if @props.siteEditMode.mode
          if @props.passedInStates.edit.article
            @toolbarOnEdit()
          else
            @toolbarOnReadOnly()
        ####

        DOM.div
          className: "inner-wrapper-news-div"

          # Card equalization
          ref: @props.cardNumber
          style:
            minHeight: @props.passedInDomProps.req_div_height
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
            if @props.passedInStates.edit.article
              [ @titleEditable(), @teaserEditable() ]
            else
              [ @titleReadOnly(), @teaserReadOnly() ]
          ####

        # Readmore button
        DOM.p
          className: "btn-container read-more-news-btn-container"
          DOM.a
            href: @props.cardBtnTarget
            className: "btn btn-lg black-square-btn news-read-more-btn"
            @props.passedInUiPropsForArticles.localizedReadMore
        ####

`module.exports = {
  NewsCard: NewsCard
};`
