import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NewsCard } from './news_card';
import { IndividualNewsContainer } from './individual_news_container';

export const NewsCardsContainer = React.createClass({
// export class NewsCardsContainer extends React.Component {

  createCards() {
    return (
      this.props.articles.map(
        (card, i) => {
          let element = <NewsCard
            key=                               {i}
            cardNumber=                        {i}
            card=                              {card}
            articlesPassedInUiProps=           {this.props.articlesPassedInUiProps}
          // #   # cardBtnTarget: card.dataset.btnTarget
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
            siteEditMode=                      {this.props.siteEditMode}/>;
          return element;
        }
      )
    )
  },

  renderChildren() {
    return (
      this.props.children && React.cloneElement(this.props.children, {
         articlesActions:                   this.props.articlesActions,
         articlesFieldsActions:             this.props.articlesFieldsActions,
         articlesSizingPositionningActions: this.props.articlesSizingPositionningActions,
         siteEditMode:                      this.props.siteEditMode,
         articles:                          this.props.articles,
         articlesWIPStatesOfFields:         this.props.articlesWIPStatesOfFields,
         articlesEditStates:                this.props.articlesEditStates,
         articlesDOMProps:                  this.props.articlesDOMProps,
         articlesPassedInUiProps:           this.props.articlesPassedInUiProps
      })
    )
  },

  render() {
    let cards = this.createCards();

    return (
      <ReactCSSTransitionGroup
        transitionName="react-news-container"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={4000}>
        <div className="row">
          <div className="col-xs-6">
            { cards }
          </div>
          <div className="col-xs-6">
            {this.renderChildren()}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    )
  }
});
