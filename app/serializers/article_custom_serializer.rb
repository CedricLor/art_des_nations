class ArticleCustomSerializer < ActiveModel::Serializer
  attr_accessor :media_container_ids

  self.root = false
  has_many :media_containers,
    each_serializer: MediaContainerSerializerForArticleSerializer

  attributes :body, :posted_at, :status, :teaser, :title
end
