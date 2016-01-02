`NewsEditableFieldToolbar = require('./news_editable_field_toolbar.js.coffee').NewsEditableFieldToolbar`

NewsTitleTeaserZone = React.createClass

  # getInitialState: () ->
  #   value: @props.card[@props.name]

  handleChange: (e) ->
    [fieldName, fieldValue] = [e.target.name, e.target.value]
    @setState({ value: fieldValue })
    @props.articlesFieldsActions.changeFieldOfArticle(@props.card.id, fieldName, fieldValue)

  handleEditField: (e) ->
    e.preventDefault()
    console.log(e.target)
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    @props.articlesFieldsActions.changeArticleEditStateOfField(@props.card.id, fieldName, true)

  handleDeleteText: (e) ->
    [fieldName, fieldValue] = [e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2], '']
    @props.articlesFieldsActions.changeFieldOfArticle(@props.card.id, fieldName, fieldValue)
    # @setState({ value: '' })

  handleRestoreText: (e) ->
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    @props.articlesFieldsActions.handleRestoreText(@props.card.id, fieldName)

  rawMarkup: (raw) ->
    { __html: raw }

  editableZone: ->
    DOM.div
      className: 'input-group'
      key: "#{@props.name}_editable"
      DOM.input
        className: 'form-control'
        type: 'text'
        defaultValue: @props.card[@props.name]
        value: @props.card[@props.name]
        ref: "#{@props.name}"
        name: "#{@props.name}"
        onChange: @handleChange
      React.createElement NewsEditableFieldToolbar,
        forFieldName:                "#{@props.name}",
        card:                        @props.card,
        articlesPassedInUiProps:     @props.articlesPassedInUiProps,
        articlesWIPStatesOfFields:   @props.articlesWIPStatesOfFields,
        articlesFieldsActions:       @props.articlesFieldsActions,
        handleUpdate:                @props.handleUpdate,
        handleEditField:             @handleEditField,
        handleDeleteText:            @handleDeleteText,
        handleRestoreText:           @handleRestoreText

  editButton: ->
    DOM.button
      className: 'btn'
      name: "edit_button_for_#{@props.name}"
      onClick: @handleEditField
      # FIXME: CSS
      style:
        backgroundColor: 'white'
      DOM.span
        className: 'glyphicon glyphicon-pencil'
        ariaHidden: 'true'
        # FIXME: CSS
        style:
          backgroundColor: 'white'

  editButtonEditableZoneSwitch: ->
    # if site edit mode on, show edit tools
    if @props.siteEditMode.mode
      if @props.articlesEditStates[@props.name]
        # if field edit mode on, show form and field edit tools
        @editableZone()
        # else show pencil button
      else
        @editButton()

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
      @editButtonEditableZoneSwitch("title")

  teaserReadOnly: ->
    DOM.div
      key: 'teaser_read_only'
      DOM.div
        className: "teaser"
        style:
          display: "inline-block" if @props.siteEditMode.mode
        dangerouslySetInnerHTML: @rawMarkup(@props.card.teaser)
      @editButtonEditableZoneSwitch("teaser")

  render: ->
    if @props.name == "title" then @titleReadOnly() else @teaserReadOnly()


`module.exports = {
  NewsTitleTeaserZone: NewsTitleTeaserZone
};`
