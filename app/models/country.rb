class Country < ActiveRecord::Base
  include MainModelsModifiers

  validates :name, presence: true
  validates :title, presence: true
  validates :editorial, presence: true

  has_many :aktions, inverse_of: :country

  has_many :external_linkings, :as => :external_linkable, inverse_of: :country
  has_many :external_links, through: :external_linkings

  translates :name, :title, :editorial, :fallbacks_for_empty_translations => true

  def teaser
    self.editorial
  end
end
