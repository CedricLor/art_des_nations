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
    if (this.props.children) {
      const currentArticle = _.find(this.props.articles, { 'id': parseInt(this.props.children.props.params.id)});
      return (
        this.props.children && React.cloneElement(this.props.children, {
           articlesActions:                   this.props.articlesActions,
           articlesFieldsActions:             this.props.articlesFieldsActions,
           // articlesSizingPositionningActions: this.props.articlesSizingPositionningActions,
           siteEditMode:                      this.props.siteEditMode,
           currentArticle:                    currentArticle,
           articlesWIPStatesOfFields:         this.props.articlesWIPStatesOfFields,
           articlesEditStates:                this.props.articlesEditStates,
           articlesDOMProps:                  this.props.articlesDOMProps,
           articlesPassedInUiProps:           this.props.articlesPassedInUiProps
        })
      )
    }
  },

  render() {
    let colClassForIndex = "";
    let colClassForArticle = "";
    if (this.props.children) {
      colClassForIndex = "col-xs-3";
      colClassForArticle = "col-xs-9";
    } else {
      colClassForIndex = "col-xs-12";
      colClassForArticle = "hidden";
    }
    let cards = this.createCards();

    return (
      <div className="row">
        <ReactCSSTransitionGroup
          transitionName="react-news-container"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={4000}>
          <div className="col-xs-12">
            { cards }
          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});
