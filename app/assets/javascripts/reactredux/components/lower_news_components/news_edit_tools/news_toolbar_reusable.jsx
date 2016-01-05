import React from 'react';

// ########################################
// ## NewsToolbarOnEdit Component
// ########################################
export const NewsToolbarReusable = React.createClass({

  render() {
    return (
      <div
        className= "news-toolbar"
        name=      {`buttons_${this.props.parentIdentification}_for_article`}>
        <a
          className= {`btn ${this.props.classNameForFirstBtn}`}
          onClick=   {this.props.functionForFirstButton}>
          {this.props.textForFirstButton}
        </a>
        <a
          name=      {`save_button_${this.props.parentIdentification}_for_article`}
          className= {`btn ${this.props.classNameForSecondBtn}`}
          onClick=   {this.props.functionForSecondButton}>
          {this.props.textForSecondButton}
        </a>
      </div>
    )
  }
})


    // // onClick=   {this.props.handleCancel}
    //       {this.props.articlesPassedInUiProps.cancelEditArticle.text}
    // // onClick=   {this.props.handleEdit}>
    //       {this.props.articlesPassedInUiProps.update.text}
