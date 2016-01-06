import { NewsEditButtonEditableZoneSwitch } from '../news_edit_tools/news_edit_button_editable_zone_switch';
import { inlineBlockStyleForReadOnly } from '../../component_helpers/news_forms_helpers';

export const NewsPostedAtZone = React.createClass({

  editButtonEditableZoneSwitch() {
    if (this.props.siteEditMode.mode) {
      return (
        <NewsEditButtonEditableZoneSwitch
          name=                        {this.props.name}
          type=                        {this.props.type}
          siteEditMode=                {this.props.siteEditMode}
          card=                        {this.props.card}
          articlesEditStates=          {this.props.articlesEditStates}
          articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
          articlesWIPStatesOfFields=   {this.props.articlesWIPStatesOfFields}
          articlesFieldsActions=       {this.props.articlesFieldsActions}
          handleUpdate=                {this.props.handleUpdate}
          handleEditField=             {this.props.handleEditField}
          handleDeleteText=            {this.props.handleDeleteText}
          handleRestoreText=           {this.props.handleRestoreText}/>
      )
    }
  },

  articleCreatedAtForIndex() {
    const style = {}

    return (
      <p
        style= { style }>
          {this.props.card.posted_at}
      </p>
    )
  },

  articleCreatedAtForSinglePage() {
    return (
      <h3 className="posted-at">
        {this.props.card.posted_at}
      </h3>
    )
  },

  switchCreatedAtType() {
    switch (this.props.viewType) {
      case "indexView":
        return this.articleCreatedAtForIndex()
      case "articleView":
        return this.articleCreatedAtForSinglePage()
      default:
        return this.articleCreatedAtForIndex()
    }
  },

  render() {
    return (
      <div>
        {this.switchCreatedAtType()}
        {this.editButtonEditableZoneSwitch()}
      </div>
    )
  }
})
