class ArticlesCustomSerializer
  attr_accessor :articles

  def initialize(articles:)
    @articles = articles
  end

  def serialize_as_hash
    hash = { articles: {}, media_containers: {} }
    @articles.each do |article |
      serialized_article = ArticleCustomSerializer.new(article)
      hash[:articles][article.id] = serialized_article.as_json

      hash[:articles][article.id]["media_container_ids"].each do |media_container_id|
        hash[:media_containers][media_container_id] = MediaContainerSerializerForArticleSerializer.new(MediaContainer.find(media_container_id))
      end

    end
    hash
  end
end

