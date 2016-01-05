import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { NewsToolbar } from './lower_news_components/news_edit_tools/news_toolbar';
import { NewsContentZoneSwitch } from './lower_news_components/news_content_components/news_content_zone_switch';

export const IndividualNewsContainer = React.createClass({

  handleDelete(e) {
    e.preventDefault();
    this.props.articlesActions.handleDeleteArticle(this.props.currentArticle.id);
  },

  handleEdit(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.currentArticle.id, 'article', true);
  },

  handleCancel(e) {
    e.preventDefault();
    this.props.articlesActions.handleCancelEditArticle(this.props.currentArticle.id);
  },

  handleUpdate(e) {
    e.preventDefault();
    const fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2];
    this.props.articlesActions.handleUpdateArticle(this.props.currentArticle.id, fieldName);
  },

  createFieldZone(fieldName) {
    return React.createElement(
      NewsContentZoneSwitch,
      {
        key:                         `${this.props.articlesDOMProps.cardNumber}_${fieldName}`,
        viewType:                    "articleView",
        name:                        fieldName,
        card:                        this.props.currentArticle,
        articlesPassedInUiProps:     this.props.articlesPassedInUiProps,
        // redux store properties
        siteEditMode:                this.props.siteEditMode,
        articlesEditStates:          this.props.articlesEditStates,
        articlesWIPStatesOfFields:   this.props.articlesWIPStatesOfFields,
        // unset properties
        cardImageSource:             this.props.cardImageSource,
        // redux actions
        articlesFieldsActions:       this.props.articlesFieldsActions,
        // local functions
        handleUpdate:                this.handleUpdate
      }
    );
  },

  newsToolbar() {
    if (this.props.siteEditMode.mode) {
      return React.createElement(
        NewsToolbar,
        {
          articlesPassedInUiProps: this.props.articlesPassedInUiProps,
          cardNumber:              this.props.articlesDOMProps.cardNumber,
          articlesEditStates:      this.props.articlesEditStates,
          // local functions
          handleUpdate:            this.handleUpdate,
          handleEdit:              this.handleEdit,
          handleCancel:            this.handleCancel,
          handleDelete:            this.handleDelete
        }
      )
    }
  },

  renderTags() {
    if ( this.props.currentArticleTags ) {
          tagElementsArray = this.props.articleTags.map( (tag) => {
            return (
              <Link to="#">
                <span className="label label-primary">{ tag + " " }</span>
              </Link>
            )
          })
      return (
        <p class="tags">
          <i class="glyphicon glyphicon-tags"></i>
            {tagElementsArray}
        </p>
      )
    }
  },

  renderAuthor() {
    return (
      <div className="news-author">
        <Link to="#">
          { "by" }&#8239;{ this.props.article.author.full_name }
        </Link>
      </div>
    )
  },

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="react-news-container"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={2000}>


        <article className="news">
          <div className="row">
            <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">

              {this.newsToolbar()}

              {this.createFieldZone("title")}

              {this.createFieldZone("posted_at")}

              {this.renderTags()}

              <div className="news-teaser">
                {this.createFieldZone("teaser")}
              </div>

              <hr/>

              <div className="news-body">
                {this.createFieldZone("body")}
              </div>

              {/*this.renderAuthor()*/}

            </div>
          </div>
        </article>


      </ReactCSSTransitionGroup>
    )
  }
})

