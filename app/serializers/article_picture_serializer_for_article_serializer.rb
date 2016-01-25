class ArticlePictureSerializerForArticleSerializer < ActiveModel::Serializer
  has_one :media_container, serializer: MediaContainerSerializerForArticleSerializer

  attributes :id, :media_container_id, :for_card, :for_carousel
end
