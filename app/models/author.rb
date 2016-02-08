class Author < ActiveRecord::Base
  validates :full_name, presence: true

  has_many :articles, inverse_of: :author, dependent: :destroy
  has_many :media_containers, through: :articles
end
