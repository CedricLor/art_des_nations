class MediaContainerSerializerForArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :media_file_name, :media_content_type, :media_file_size, :media
end
