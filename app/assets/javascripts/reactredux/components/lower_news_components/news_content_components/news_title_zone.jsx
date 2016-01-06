import {NewsEditButtonEditableZoneSwitch} from '../news_edit_tools/news_edit_button_editable_zone_switch';
import ContentEditable from './content_editable';
import { inlineBlockStyleForReadOnly } from '../../component_helpers/news_forms_helpers';

import {Link} from 'react-router';

export const NewsTitleZone = React.createClass({

  handleChange(e) {
    const [fieldName, fieldValue] = [e.target.name, e.target.value];
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue)  ;
  },

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

  articleTitleForIndex() {
    let styleForH3 = {}
    if (this.props.cardImageSource == "") {
      styleForH3["marginTop"] = 0;
    }
    styleForH3 = inlineBlockStyleForReadOnly(styleForH3, this.props.siteEditMode.mode)

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
    styleForH1 = inlineBlockStyleForReadOnly(styleForH1, this.props.siteEditMode.mode)
    if (this.props.siteEditMode.mode && this.props.articlesEditStates.article) {
      return (
        <ContentEditable
          eltType=  "h1"
          name=     {this.props.name}
          style=    {styleForH1}
          html=     {this.props.card.title}
          disabled= {false}
          onChange= {this.handleChange}
          />
      )
    } else {
      return (
        <h1
          style= {styleForH1} >
          {this.props.card.title}
        </h1>
      )
    }
  },

  switchTitleType() {
    switch (this.props.viewType) {
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
      this.switchTitleType()
    )
  }
})
