// ########################################
// ## Image Component
// ########################################

export class NewsImage extends React.Component {
  render() {
    return (
      <img src={this.props.cardImageSource} alt={this.props.newsTitle} />
    );
  }
}
