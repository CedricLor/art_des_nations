class Aktion < ActiveRecord::Base
  validates :country_id, presence: true
  validates :title, presence: true
  validates :posted_at, presence: true
  validates :aktion_date, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an aktion. Choose between draft, published, featured or archived" }

  default_scope { order(aktion_date: :desc) }

  has_many :portraitizings, :as => :portraitizable, inverse_of: :aktion
  has_many :portraits, through: :portraitizings

  has_many :picturizings, :as => :picturizable, inverse_of: :aktion
  has_many :media_containers, through: :picturizings

  has_many :categorizings, :as => :categorizable, inverse_of: :aktion
  has_many :categories, through: :categorizings

  has_many :article_linkings, :as => :article_linkable, inverse_of: :aktion
  has_many :articles, through: :article_linkings

  belongs_to :country, inverse_of: :aktions

  translates :title, :body, :teaser, :status, :fallbacks_for_empty_translations => true

  def self.for_country(country)
    Aktion.where(status: ["published", "featured"]).
      where(country_id: country.id).
      includes([
        categories: :translations,
        picturizings: [:translations, [media_container: :translations]]
      ]).
      where(picturizing_translations: {for_card: "true"})
  end

  def self.for_home_page
    Aktion.where(status: ["published", "featured"]).
      includes(country: :translations).
      includes([
        categories: :translations,
        picturizings: [:translations, [media_container: :translations]]
      ]).
      where(picturizing_translations: {for_card: "true"})
  end

  def media_containers_for_carousel
    MediaContainer.for_carousel_for('Aktion', id)
  end

  def date_sorting_field
    aktion_date
  end
end
