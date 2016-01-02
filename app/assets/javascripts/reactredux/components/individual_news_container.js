export const IndividualNewsContainer = React.createClass({

  render() {
    let currentArticle = _.find(this.props.articles, { 'id': parseInt(this.props.params.id)});

    return (
      <article className="news">
        <div className="row">
          <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
            <h1>{ currentArticle.title }</h1>
            <h3 className="posted-at">
              { currentArticle.created_at }
            </h3>
          </div>
        </div>
      </article>
    )
  }
})

