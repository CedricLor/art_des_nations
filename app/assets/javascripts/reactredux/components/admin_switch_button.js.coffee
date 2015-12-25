# admin_switch_button.js.coffee
AdminSwitchButton = React.createClass
  displayName: "AdminSwitchButton"

  handleToggleSiteEditMode: (e) ->
    e.preventDefault()
    @props.onToggleSiteEditMode()

  render: ->
    DOM.a
      className: 'btn btn-danger'
      onClick: @handleToggleSiteEditMode
      @props.siteEditModePassedInProps.site_edit_mode_button_props.button_text[@props.siteEditMode.mode]

`module.exports = {
  AdminSwitchButton: AdminSwitchButton
};`
