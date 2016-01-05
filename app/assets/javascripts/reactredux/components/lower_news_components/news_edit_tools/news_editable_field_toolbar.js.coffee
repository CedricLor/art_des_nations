window.React = require('react');
window.DOM = React.DOM;

########################################
## NewsEditableFieldToolbarButton Component
########################################
NewsEditableFieldToolbarButton = React.createClass

  carretSpan: ->
    DOM.span
      key: 'carret_span'
      className: 'caret'

  carretSrSpan: ->
    DOM.span
      key: 'carret_sr_span'
      className: 'sr-only'
      'Toggle Dropdown'

  carretBtn: ->
    DOM.button
      type: 'button'
      className: "btn btn-default #{@props.additionalClassNames}"
      "data-toggle": 'dropdown'
      ariaHaspopup: 'true'
      ariaExpanded: 'false'
      [@carretSpan(), @carretSrSpan()]

  saveBtn: ->
    DOM.button
      type: 'button'
      name: "#{@props.btnName}#{@props.forFieldName}"
      className: "btn btn-default #{@props.additionalClassNames}"
      onClick: @props.handleUpdate
      DOM.span
        className: 'glyphicon glyphicon-floppy-save'
        ariaHidden: 'true'

  render: ->
    if @props.carret == true then @carretBtn() else @saveBtn()

########################################
## EditableFieldSubToolBarButton Component
########################################
EditableFieldSubToolBarButton = React.createClass

  render: ->
    DOM.button
      type: 'button'
      name: "#{@props.btnName}#{@props.forFieldName}"
      # FIXME - IN CSS
      style:
        backgroundColor: 'white'
        borderStyle: 'none'
        display: 'block'
        margin: 'auto'
      onClick: @props.btnFunction
      DOM.span null,
        @props.btnText

########################################
## NewsEditableFieldToolbar Component
########################################
NewsEditableFieldToolbar = React.createClass

  handleExitEditField: (e) ->
    e.preventDefault()
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    @props.articlesFieldsActions.changeArticleEditStateOfField(@props.card.id, fieldName, false)

  deleteTextButton: ->
    React.createElement EditableFieldSubToolBarButton,
      btnName:      'delete_content_button_for_',
      forFieldName: @props.forFieldName,
      btnFunction:  @props.handleDeleteText,
      btnText:      @props.articlesPassedInUiProps.deleteText.text

  restoreTextButton: ->
    React.createElement EditableFieldSubToolBarButton,
      btnName:      'restore_content_button_for_',
      forFieldName: @props.forFieldName,
      btnFunction:  @props.handleRestoreText,
      btnText:      @props.articlesPassedInUiProps.restoreText.text

  exitEditFieldButton: ->
    React.createElement EditableFieldSubToolBarButton,
      btnName:      'exit_button_for_',
      forFieldName: @props.forFieldName,
      btnFunction:  @handleExitEditField,
      btnText:      @props.articlesPassedInUiProps.exitEditField.text

  saveFieldButton: ->
    React.createElement NewsEditableFieldToolbarButton,
      btnName:              'save_button_for_',
      forFieldName:         @props.forFieldName,
      handleUpdate:         @props.handleUpdate,
      additionalClassNames: ''

  carretToggleButton: ->
    React.createElement NewsEditableFieldToolbarButton,
      btnName:              '',
      forFieldName:         '',
      additionalClassNames: ' dropdown-toggle',
      carret:               true

  buttonsForEditable: ->
    DOM.div
      className: 'input-group-btn'
      @saveFieldButton()
      @carretToggleButton()

      DOM.ul
        className: "dropdown-menu dropdown-menu-right"
        if @props.articlesWIPStatesOfFields[@props.forFieldName]
          DOM.li null,
            @restoreTextButton()
        else
          DOM.li null,
            @exitEditFieldButton()
        DOM.li null,
          DOM.hr
            # FIXME - IN CSS
            style:
              marginTop: '5px'
              marginBottom: '5px'
        DOM.li null,
          @deleteTextButton()

  render: ->
    @buttonsForEditable()

`module.exports = {
  NewsEditableFieldToolbar: NewsEditableFieldToolbar
};`
