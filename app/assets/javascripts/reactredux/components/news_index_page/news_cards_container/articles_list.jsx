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
  },

  createCards() {
    return (
      this.props.articles.map(
        (card, i) => {
          let element = <NewsCard
            key=                               {i}
            cardNumber=                        {i}
            card=                              {card}
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
            routeParams=                       {this.props.routeParams}/>;
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
