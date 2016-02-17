class Article < ActiveRecord::Base
  validates :title, presence: true
  validates :teaser, presence: true
  validates :posted_at, presence: true
  validates :posted_from_location, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an article. Choose between draft, published, featured or archived" }
  validates :author_id, presence: true

  default_scope { order(posted_at: :desc) }

  belongs_to :author, inverse_of: :articles

  has_many :portraitizings, :as => :portraitizable, inverse_of: :article
  has_many :portraits, through: :portraitizings

  has_many :picturizings, :as => :picturizable, inverse_of: :article
  has_many :media_containers, through: :picturizings

  has_many :categorizings, :as => :categorizable, inverse_of: :article
  has_many :categories, through: :categorizings

  has_many :article_linkings, inverse_of: :article
  has_many :articles, through: :article_linkings, :source => :article_linkable,
           :source_type => 'Article'
  has_many :aktions, through: :article_linkings, :source => :article_linkable,
           :source_type => 'Aktion'
  has_many :portaits, through: :article_linkings, :source => :article_linkable,
           :source_type => 'Portrait'

  translates :title, :body, :teaser, :posted_from_location, :status, :fallbacks_for_empty_translations => true

  def self.for_home_page
    Article.where(status: ["published", "featured"]).
      includes([
        categories: :translations,
        picturizings: [:translations, [media_container: :translations]]
      ]).
      where(picturizing_translations: {for_card: "true"})
  end

  def media_containers_for_carousel
    MediaContainer.for_carousel_for('Article', id)
  end

  def date_sorting_field
    posted_at
  end
end


# <div class="col-xs-12 col-sm-6 col-md-4 recommandation">
#   <p class="categorie">
#     <!-- FIXME - article.categories.first -->
#     <!-- article.categories.first.name, article.categories.first -->
#     <%= link_to article[:category].name, category_path(article[:category]) %>
#   </p>

#   <%= link_to article_path(article[:id]) do %>

#     <div class="img-wrapper">
#       <!-- FIXME - article.media_containers.where(for_card: true).first -->
#       <%= image_tag(article[:media], alt: "") %>
#       <div class="layer"></div>
#     </div>
#     <h3><%= article[:title] %></h3>

#   <% end %>
# </div>
