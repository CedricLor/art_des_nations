class Feed
  # include ActiveModel::Model
  # include ActiveModel::Serialization
  NUMBER_OF_ARTICLES = 20

  attr_accessor :articles

  def initialize(articles:)
    @articles = articles.order(created_at: :desc).limit(NUMBER_OF_ARTICLES)
  end

  def with_pictures
    @articles.map { |article| ArticleWithPictures.new(article).picture_for_card }
  end

end
