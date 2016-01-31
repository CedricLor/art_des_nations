class Article < ActiveRecord::Base
  validates :title, presence: true
  validates :teaser, presence: true
  validates :posted_at, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an article" }

  has_many :article_pictures, inverse_of: :article, dependent: :destroy
  has_many :media_containers, through: :article_pictures

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true
end
