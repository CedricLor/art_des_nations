import {NewsEditButtonEditableZoneSwitch} from './news_edit_button_editable_zone_switch';
import {Link} from 'react-router';

export const NewsTeaserZone = React.createClass({

  rawMarkup(raw) {
    return { __html: raw }
  },

  editButtonEditableZoneSwitch() {
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
  },

  inlineBlockStyleForReadOnly(styleObject) {
    if (this.props.siteEditMode.mode == true) {
      return Object.assign(styleObject, { "display": "inline-block" })
    } else {
      return styleObject
    }
  },

  articleTeaserForIndex() {
    let styleForTeaser = {}
    styleForTeaser = this.inlineBlockStyleForReadOnly(styleForTeaser);

    return (
      <span>
        <div key= 'teaser_read_only'>
          <div
            className=               "teaser"
            style=                   {styleForTeaser}
            dangerouslySetInnerHTML= {this.rawMarkup(this.props.card.teaser)}
            >
          </div>
          {this.editButtonEditableZoneSwitch()}
        </div>
      </span>
    )
  },

  articleTeaserForSinglePage() {
    return this.articleTeaserForIndex()
  },

  switchTeaserType(viewType) {
    switch (viewType) {
      case "indexView":
        return this.articleTeaserForIndex()
      case "articleView":
        return this.articleTeaserForSinglePage()
      default:
        return this.articleTitleForIndex()
    }
  },

  render() {
    return (
      <span>
        { this.switchTeaserType(this.props.viewType) }
      </span>
    )
  }
})
