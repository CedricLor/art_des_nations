class Aktion < ActiveRecord::Base
  include MainModelsModifiers
  include Linkings

  default_scope { order(aktion_date: :desc) }

  has_many :picturizings, :as => :picturizable, inverse_of: :aktion
  has_many :media_containers, through: :picturizings

  has_many :categorizings, :as => :categorizable, inverse_of: :aktion, dependent: :destroy
  has_many :categories, through: :categorizings

  # has_many :portraitizings, :as => :portraitizable, inverse_of: :aktion
  # has_many :portraits, through: :portraitizings

  # has_many :article_linkings, :as => :article_linkable, inverse_of: :aktion
  # has_many :articles, through: :article_linkings

  belongs_to :country, inverse_of: :aktions


  has_many :to_linkings, :as => :from_linkable, class_name: "Linking"
  has_many :from_linkings, :as => :to_linkable, class_name: "Linking"

  has_many :to_aktions, through: :to_linkings, source: :to_linkable, source_type: "Aktion"
  has_many :from_aktions, through: :from_linkings, source: :from_linkable, source_type: "Aktion"

  has_many :to_article, through: :to_linkings, source: :to_linkable, source_type: "Article"
  has_many :from_article, through: :from_linkings, source: :from_linkable, source_type: "Article"

  has_many :to_portraits, through: :to_linkings, source: :to_linkable, source_type: "Portrait"
  has_many :from_portraits, through: :from_linkings, source: :from_linkable, source_type: "Portrait"



  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true


  def self.for_country(country)
    Aktion.includes(picturizings: [:translations, media_container: :translations]).
      where(status: ["published", "featured"]).
      where(country_id: country.id).uniq
  end

  def self.for_home_page
    Aktion.includes(country: :translations).
      includes(categorizings: [category: :translations]).
      includes(picturizings: [:translations, media_container: :translations]).
      where(status: ["featured"]).uniq
  end

  def media_containers_for_carousel
    MediaContainer.for_carousel_for('Aktion', id)
  end

  def date_sorting_field
    aktion_date
  end
end
