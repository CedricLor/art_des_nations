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

  def self.for_home_page(locale)
    articles = Article.where(status: ["published", "featured"])

    articles_with_title = get_articles_titles_translations(articles, locale)

    media_container_ids_by_element_id, medias_by_media_container_ids = get_media_sub_hashes('Article')

    add_medias_and_categories_to_articles(articles_with_title, media_container_ids_by_element_id, medias_by_media_container_ids)
  end

  def media_containers_for_carousel
    MediaContainer.for_carousel_for('Article', id)
  end

  private

  def self.get_articles_titles_translations(articles, locale)
    # 2. Select all the portrait translation in the current locale corresponding to the portraits
    locale_article_translations = Article::Translation.where(locale: locale || I18n.default_locale, article_id: articles.map { |a| a.id })
    # 3. Create an array of hashes with the portraits and the corresponding title
    i = -1
    articles_with_title = locale_article_translations.map do |at|
      i = i + 1
      {
        id: at.article_id,
        title: at.title,
        item: articles[i]
      }
    end
  end

  def self.get_media_sub_hashes(picturizable_type)
    # 4. Select all the picturizings associated with the Portrait and flagged as for card
    picturizings = Picturizing.where(for_card: 'true', picturizable_type: picturizable_type)
    # 5. Create a hashmap of the media_container_ids by portrait_id
    media_container_ids_by_element_id = Hash[picturizings.map { |p| [p.picturizable_id, p.media_container_id] }]
    # 6. Select the mediaContainers corresponding to the picturizings (uniq allows to select the mediaContainers only once and sort to sort them for perf)
    media_containers = MediaContainer.find(picturizings.map { |p| p.media_container_id }.uniq.sort)
    # 6. Create a hashmap of the medias url (in size for_card) by mediaContainerIds
    medias_by_media_container_ids = Hash[media_containers.map { |md| [md.id, md.media(:for_card)] }]

    return media_container_ids_by_element_id, medias_by_media_container_ids
  end

  def self.add_medias_and_categories_to_articles(articles_with_title, media_container_ids_by_element_id, medias_by_media_container_ids)
    # 7. Add the medias to the portraits
    articles_with_title.map do |art|
      art.
        merge({media: medias_by_media_container_ids[media_container_ids_by_element_id[art[:id]]]}).
        merge({category: art[:item].categories.first })
    end
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
