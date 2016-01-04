`Link = require('react-router').Link`

`NewsTitleZone = require('./news_title_zone').NewsTitleZone`
`NewsTeaserZone = require('./news_teaser_zone').NewsTeaserZone`

NewsTitleTeaserZone = React.createClass

  handleEditField: (e) ->
    e.preventDefault()
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.card.id, fieldName, true)

  handleDeleteText: (e) ->
    [fieldName, fieldValue] = [e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2], '']
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue)

  handleRestoreText: (e) ->
    fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2]
    this.props.articlesFieldsActions.handleRestoreText(this.props.card.id, fieldName)

  titleReadOnly: ->
    React.createElement NewsTitleZone,
      viewType:                    this.props.viewType,
      cardImageSource:             this.props.cardImageSource,
      name:                        this.props.name,
      type:                        "text",
      siteEditMode:                this.props.siteEditMode,
      card:                        this.props.card,
      articlesEditStates:          this.props.articlesEditStates,
      articlesPassedInUiProps:     this.props.articlesPassedInUiProps,
      articlesWIPStatesOfFields:   this.props.articlesWIPStatesOfFields,
      articlesFieldsActions:       this.props.articlesFieldsActions,
      handleUpdate:                this.props.handleUpdate,
      handleEditField:             this.handleEditField,
      handleDeleteText:            this.handleDeleteText,
      handleRestoreText:           this.handleRestoreText

  teaserReadOnly: ->
    React.createElement NewsTeaserZone,
      viewType:                    this.props.viewType,
      cardImageSource:             this.props.cardImageSource,
      name:                        this.props.name,
      type:                        "textarea",
      siteEditMode:                this.props.siteEditMode,
      card:                        this.props.card,
      articlesEditStates:          this.props.articlesEditStates,
      articlesPassedInUiProps:     this.props.articlesPassedInUiProps,
      articlesWIPStatesOfFields:   this.props.articlesWIPStatesOfFields,
      articlesFieldsActions:       this.props.articlesFieldsActions,
      handleUpdate:                this.props.handleUpdate,
      handleEditField:             this.handleEditField,
      handleDeleteText:            this.handleDeleteText,
      handleRestoreText:           this.handleRestoreText

  switchTextZones: ->
    switch this.props.name
      when "title" then return this.titleReadOnly()
      when "teaser" then return this.teaserReadOnly()
      # case "body":
      #   return this.bodyReadOnly()
      # case "author":
      #   return this.authorReadOnly()
      # case "tags":
      #   return this.tagsReadOnly()
      # case "created_at":
      #   return this.postedAtReadOnly()
      # case "posted_at":
      else return this.teaserReadOnly()
        # return this.defaultReadOnly()

  render: ->
    this.switchTextZones()

`module.exports = {
  NewsTitleTeaserZone: NewsTitleTeaserZone
};`
