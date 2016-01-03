import {NewsEditButtonEditableZoneSwitch} from './news_edit_button_editable_zone_switch';
import {Link} from 'react-router';

export const NewsTitleZone = React.createClass({

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

  articleTitleForIndex() {
    let styleForH3 = {}
    if (this.props.cardImageSource == "") {
      styleForH3["marginTop"] = 0;
    }
    styleForH3 = this.inlineBlockStyleForReadOnly(styleForH3);

    return (
      <span>
        <Link
          key= 'title_read_only'
          to= {`/article/${this.props.card.id}`}>
          <h3
            style= { styleForH3 }>
              {this.props.card.title}
          </h3>
        </Link>
        {this.editButtonEditableZoneSwitch()}
      </span>
    )
  },

  articleTitleForSinglePage() {
    let styleForH1 = {};
    styleForH1 = this.inlineBlockStyleForReadOnly(styleForH1);

    return (
      <span>
        <h1 style= {styleForH1} >
          {this.props.card.title}
        </h1>
        {this.editButtonEditableZoneSwitch()}
      </span>
    )
  },

  switchTitleType(viewType) {
    switch (viewType) {
      case "indexView":
        return this.articleTitleForIndex()
      case "articleView":
        return this.articleTitleForSinglePage()
      default:
        return this.articleTitleForIndex()
    }
  },

  render() {
    return (
      <span>
        { this.switchTitleType(this.props.viewType) }
      </span>
    )
  }
})
