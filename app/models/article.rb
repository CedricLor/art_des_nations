class Article < ActiveRecord::Base
  include MainModelsModifiers
  include Linkings

  default_scope { order(posted_at: :desc) }

  belongs_to :author, inverse_of: :articles

  has_many :picturizings, :as => :picturizable, inverse_of: :article
  has_many :media_containers, through: :picturizings

  has_many :categorizings, :as => :categorizable, inverse_of: :article, dependent: :destroy
  has_many :categories, through: :categorizings


  has_many :to_linkings, :as => :from_linkable, class_name: "Linking"
  has_many :from_linkings, :as => :to_linkable, class_name: "Linking"

  has_many :to_aktions, through: :to_linkings, source: :to_linkable, source_type: "Aktion"
  has_many :from_aktions, through: :from_linkings, source: :from_linkable, source_type: "Aktion"

  has_many :to_article, through: :to_linkings, source: :to_linkable, source_type: "Article"
  has_many :from_article, through: :from_linkings, source: :from_linkable, source_type: "Article"

  has_many :to_portraits, through: :to_linkings, source: :to_linkable, source_type: "Portrait"
  has_many :from_portraits, through: :from_linkings, source: :from_linkable, source_type: "Portrait"


  translates :title, :body, :teaser, :posted_from_location, :status, :fallbacks_for_empty_translations => true

  def self.for_home_page
    Article.includes(categorizings: [category: :translations]).
      includes(picturizings: [:translations, media_container: :translations]).
      where(status: ["featured"]).uniq
  end

  def media_containers_for_carousel
    MediaContainer.for_carousel_for('Article', id)
  end

  def date_sorting_field
    posted_at
  end

end
