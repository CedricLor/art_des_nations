import {NewsInput} from './news_input'
import {NewsTextArea} from './news_text_area'
import {NewsEditButton} from './news_edit_button'

export const NewsEditButtonEditableZoneSwitch = React.createClass({

  newsInput() {
    return (
      <NewsInput
        name=                        {this.props.name}
        type=                        {this.props.type}
        card=                        {this.props.card}
        articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
        articlesWIPStatesOfFields=   {this.props.articlesWIPStatesOfFields}
        articlesFieldsActions=       {this.props.articlesFieldsActions}
        handleUpdate=                {this.props.handleUpdate}
        handleEditField=             {this.props.handleEditField}
        handleDeleteText=            {this.props.handleDeleteText}
        handleRestoreText=           {this.props.handleRestoreText}/>
    )
  },

  newsTextArea() {
    return (
      <NewsTextArea
        name=                        {this.props.name}
        card=                        {this.props.card}
        articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
        articlesWIPStatesOfFields=   {this.props.articlesWIPStatesOfFields}
        articlesFieldsActions=       {this.props.articlesFieldsActions}
        handleUpdate=                {this.props.handleUpdate}
        handleEditField=             {this.props.handleEditField}
        handleDeleteText=            {this.props.handleDeleteText}
        handleRestoreText=           {this.props.handleRestoreText}/>
    )
  },

  editButton() {
    return (
      <NewsEditButton
        name=            {this.props.name}
        handleEditField= {this.props.handleEditField}/>
    )
  },

  editButtonEditableZoneSwitch() {
    // # if site edit mode on show edit tools
    if (this.props.siteEditMode.mode) {
      if (this.props.articlesEditStates[this.props.name]) {
        // # if field edit mode is on, show inputs or textarea and field toolbar
        if (this.props.type === "textarea") {
          return this.newsTextArea()
        } else {
          return this.newsInput()
        }
        // # else show pencil button
      }
      else {
        return this.editButton()
      }
    }
  },

  render() {
    const editButtonOrEditableZoneSwitch = this.editButtonEditableZoneSwitch();

    return (
      <span>
        {editButtonOrEditableZoneSwitch}
      </span>
    )
  }
})
