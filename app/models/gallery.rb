class Gallery < ActiveRecord::Base
  has_and_belongs_to_many :articles
  has_many :media_containers, inverse_of: :gallery

  translates :title
end
