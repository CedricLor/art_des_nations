class Article < ActiveRecord::Base
  validates :title, presence: true
  validates :teaser, presence: true
  validates :posted_at, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an article. Choose between draft, published, featured or archived" }

  default_scope { order(posted_at: :desc) }

  has_many :portraitizings, :as => :portraitizable, inverse_of: :article
  has_many :portraits, through: :portraitizings

  has_many :picturizings, :as => :picturizable, inverse_of: :article
  has_many :media_containers, through: :picturizings

  has_many :categorizings, :as => :categorizable, inverse_of: :article
  has_many :categories, through: :categorizings

  has_many :article_linkings, inverse_of: :article
  has_many :articles, through: :article_linkings, :source => :article_linkable,
           :source_type => 'Article'
  has_many :actions, through: :article_linkings, :source => :article_linkable,
           :source_type => 'Action'
  has_many :portaits, through: :article_linkings, :source => :article_linkable,
           :source_type => 'Portrait'

  has_one  :home_page, inverse_of: :article

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true
end
