class StaticPageSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :teaser
end
