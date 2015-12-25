# admin_switch_button.js.coffee
AdminSwitchButton = React.createClass
  displayName: "AdminSwitchButton"

  handleToggleAdminMode: (e) ->
    e.preventDefault()
    @props.siteAdmin.admin_functions.switch_admin_mode_function()

  render: ->
    DOM.a
      className: 'btn btn-danger'
      onClick: @handleToggleAdminMode
      @props.siteAdmin.admin_mode_button_props.button_text[@props.siteEditMode.mode]

`module.exports = {
  AdminSwitchButton: AdminSwitchButton
};`
