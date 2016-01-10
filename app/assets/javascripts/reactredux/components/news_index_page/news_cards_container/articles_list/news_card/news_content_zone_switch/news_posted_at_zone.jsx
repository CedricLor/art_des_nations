import React, {PropTypes} from 'react';
import { NewsEditButtonEditableZoneSwitch } from './commons/news_edit_button_editable_zone_switch';

export const NewsPostedAtZone = React.createClass({
  PropTypes: {
    value:                     PropTypes.string.isRequired,
    viewType:                  PropTypes.string.isRequired,
    children:                  PropTypes.element
  },
  // PropTypes: {
  //   name:                      PropTypes.string.isRequired,
  //   type:                      PropTypes.string.isRequired,
  //   sourceId:                  PropTypes.string.isRequired,
  //   value:                     PropTypes.string.isRequired,

  //   siteEditMode:              PropTypes.object.isRequired,

  //   articlesPassedInUiProps:   PropTypes.object.isRequired,
  //   currArtWIPStateCurrField:  PropTypes.string.isRequired,
  //   currArtEditStateCurrField: PropTypes.string.isRequired,

  //   handleChange:              PropTypes.func.isRequired,
  //   handleUpdate:              PropTypes.func.isRequired,
  //   handleEditField:           PropTypes.func.isRequired,
  //   handleExitEditField:       PropTypes.func.isRequired,
  //   handleDeleteText:          PropTypes.func.isRequired,
  //   handleRestoreText:         PropTypes.func.isRequired
  // },

  // editButtonEditableZoneSwitch() {
  //   if (this.props.siteEditMode.mode) {
  //     return (
  //       <NewsEditButtonEditableZoneSwitch
  //         name=                        {this.props.name}
  //         type=                        {this.props.type}
  //         sourceId=                    {this.props.sourceId}
  //         value=                       {this.props.value}

  //         articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}

  //         currArtWIPStateCurrField=    {this.props.currArtWIPStateCurrField}
  //         currArtEditStateCurrField=   {this.props.currArtEditStateCurrField}

  //         handleChange=                {this.props.handleChange}
  //         handleUpdate=                {this.props.handleUpdate}
  //         handleEditField=             {this.props.handleEditField}
  //         handleExitEditField=         {this.props.handleExitEditField}
  //         handleDeleteText=            {this.props.handleDeleteText}
  //         handleRestoreText=           {this.props.handleRestoreText}/>
  //     )
  //   }
  // },

  articleCreatedAtForIndex() {
    const style = {}

    return (
      <p
        style= { style }>
          {this.props.value}
      </p>
    )
  },

  articleCreatedAtForSinglePage() {
    return (
      <h3 className="posted-at">
        {this.props.value}
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
        {/*this.editButtonEditableZoneSwitch()*/}
        {this.props.children}
      </div>
    )
  }
})
