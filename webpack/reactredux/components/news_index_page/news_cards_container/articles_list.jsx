import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NewsCard } from './articles_list/news_card';

export const ArticlesList = React.createClass({
  propTypes: {
    articles:                          PropTypes.array.isRequired,
    articlesPassedInUiProps:           PropTypes.object.isRequired,

    articlesActions:                   PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesFieldsActions:             PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesSizingPositionningActions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesWIPStatesOfFields:         PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlesEditStates:                PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlesDOMProps:                  PropTypes.objectOf(PropTypes.object.isRequired).isRequired,

    siteEditMode:                      PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    routeParams:                       PropTypes.object.isRequired,
    siteCurrentLocale:                 PropTypes.string.isRequired,
    articlePictures:                   PropTypes.object.isRequired,
    mediaContainers:                   PropTypes.object.isRequired
  },

  getMediaContainerForCard(card) {
    let mediaContainer = undefined;
    // FIXME -- In Rails, create a field cardPictureId with a direct ref to the id of the relevant image container
    // and set the relevant ref on save in the form object to get rid of this loop
    _.forEach(
        card.article_picture_ids,
        (article_picture_id) => {
          if ( this.props.articlePictures[article_picture_id].for_card === "true" ) {
            mediaContainer = this.props.mediaContainers[this.props.articlePictures[article_picture_id].media_container_id]
          }
        }
      )
    return mediaContainer
  },

  createCards() {
    return (
      this.props.articles.map(
        (card, i) => {
          // Iterate over the articles pictures and get the corresponding mediaContainer
          const cardMediaContainer = this.getMediaContainerForCard(card);
          // Create the card element
          let element =
            <NewsCard
              key=                               {i}
              cardNumber=                        {i}
              card=                              {card}
              cardMediaContainer=                {cardMediaContainer}
              articlesPassedInUiProps=           {this.props.articlesPassedInUiProps}
              // # redux actions
              articlesActions=                   {this.props.articlesActions}
              articlesFieldsActions=             {this.props.articlesFieldsActions}
              articlesSizingPositionningActions= {this.props.articlesSizingPositionningActions}
              // # redux passed in Edit and Wip States
              articlesWIPStatesOfFields=         {this.props.articlesWIPStatesOfFields[card.id]}
              articlesEditStates=                {this.props.articlesEditStates[card.id]}
              // # redux passedInDomProps
              articlesDOMProps=                  {this.props.articlesDOMProps[card.id]}
              // # redux global site edit mode
              siteEditMode=                      {this.props.siteEditMode}
              routeParams=                       {this.props.routeParams}
              siteCurrentLocale=                 {this.props.siteCurrentLocale}
            />;
          return element;
        }
      )
    )
  },

  render() {
    let cards = this.createCards();

    return (
      <div className="row">
        <ReactCSSTransitionGroup
          transitionName="react-news-container"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={2000}>
          { cards }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
})
