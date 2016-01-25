class MediaContainerSerializer < ActiveModel::Serializer
  # has_many :articles, each_serializer: ArticleSerializer

  attributes :id, :title, :author, :source, :creation_date, :updated_at, :media_file_name, :media_content_type, :media_file_size, :media_updated_at, :media
end
