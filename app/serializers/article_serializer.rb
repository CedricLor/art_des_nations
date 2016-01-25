# class ArticleWithMediaContainers < ActiveModel::Serializer
#   def serializable_hash
#     article_serializer_hash.merge media_containers_hash
#   end

#   private

#   def article_serializer_hash
#     ArticleSerializer.new(object, options).serializable_hash
#   end

#   def media_containers_hash
#     # MediaContainers.new(object, options).serializable_hash
#   end
# end



class ArticleSerializer < ActiveModel::Serializer
  has_many :article_pictures, each_serializer: ArticlePictureSerializerForArticleSerializer

  attributes :id, :body, :posted_at, :status, :teaser, :title
end
