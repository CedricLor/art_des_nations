export const NewsEditButton = React.createClass({

  render() {
    const style = {
      backgroundColor: 'white'
    }
    return (
      <button
        className= 'btn'
        name=      {`edit_button_for_${this.props.name}`}
        onClick=   {this.props.handleEditField}
        style=     { style }
        >
        <span
          className=  'glyphicon glyphicon-pencil'
          ariaHidden= 'true'
          style=     { style }>
        </span>
      </button>
    )
  }
})
