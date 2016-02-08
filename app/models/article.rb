class Article < ActiveRecord::Base
  validates :title, presence: true
  validates :teaser, presence: true
  validates :posted_at, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an article" }

  has_many :picturizings, :as => :picturizable, inverse_of: :article, dependent: :destroy
  has_many :media_containers, through: :picturizings

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true
end
