`NewsEditButtonEditableZoneSwitch = require('./news_edit_button_editable_zone_switch').NewsEditButtonEditableZoneSwitch`
`Link = require('react-router').Link`

`NewsTitleZone = require('./news_title_zone').NewsTitleZone`
`NewsTeaserZone = require('./news_teaser_zone').NewsTeaserZone`

NewsTitleTeaserZone = React.createClass

  handleEditField: (e) ->
    e.preventDefault()
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    @props.articlesFieldsActions.changeArticleEditStateOfField(@props.card.id, fieldName, true)

  handleDeleteText: (e) ->
    [fieldName, fieldValue] = [e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2], '']
    @props.articlesFieldsActions.changeFieldOfArticle(@props.card.id, fieldName, fieldValue)

  handleRestoreText: (e) ->
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    @props.articlesFieldsActions.handleRestoreText(@props.card.id, fieldName)

  titleReadOnly: ->
    React.createElement NewsTitleZone,
      viewType:                    @props.viewType,
      cardImageSource:             this.props.cardImageSource,
      name:                        @props.name,
      type:                        "text",
      siteEditMode:                @props.siteEditMode,
      card:                        @props.card,
      articlesEditStates:          @props.articlesEditStates,
      articlesPassedInUiProps:     @props.articlesPassedInUiProps,
      articlesWIPStatesOfFields:   @props.articlesWIPStatesOfFields,
      articlesFieldsActions:       @props.articlesFieldsActions,
      handleUpdate:                @props.handleUpdate,
      handleEditField:             @handleEditField,
      handleDeleteText:            @handleDeleteText,
      handleRestoreText:           @handleRestoreText

  teaserReadOnly: ->
    React.createElement NewsTeaserZone,
      viewType:                    @props.viewType,
      cardImageSource:             this.props.cardImageSource,
      name:                        @props.name,
      type:                        "textarea",
      siteEditMode:                @props.siteEditMode,
      card:                        @props.card,
      articlesEditStates:          @props.articlesEditStates,
      articlesPassedInUiProps:     @props.articlesPassedInUiProps,
      articlesWIPStatesOfFields:   @props.articlesWIPStatesOfFields,
      articlesFieldsActions:       @props.articlesFieldsActions,
      handleUpdate:                @props.handleUpdate,
      handleEditField:             @handleEditField,
      handleDeleteText:            @handleDeleteText,
      handleRestoreText:           @handleRestoreText

  switchTextZones: ->
    switch @props.name
      when "title" then return @titleReadOnly()
      when "teaser" then return @teaserReadOnly()
      # case "body":
      #   return @bodyReadOnly()
      # case "author":
      #   return @authorReadOnly()
      # case "tags":
      #   return @tagsReadOnly()
      # case "created_at":
      #   return @postedAtReadOnly()
      # case "posted_at":
      else return @teaserReadOnly()
        # return @defaultReadOnly()

  render: ->
    @switchTextZones()

`module.exports = {
  NewsTitleTeaserZone: NewsTitleTeaserZone
};`
