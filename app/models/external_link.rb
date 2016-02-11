class ExternalLink < ActiveRecord::Base
  default_scope { order(created_at: :desc) }

  validates :name, presence: true
  validates :url, presence: true

  has_many :external_linkings, inverse_of: :external_link
  has_many :home_pages, through: :external_linkings, :source => :external_linkable,
           :source_type => 'HomePage'
  has_many :countries, through: :external_linkings, :source => :external_linkable,
           :source_type => 'Country'

  translates :name
end
