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

  def self.by_country(country_with_aktions, locale)
    aktions = country_with_aktions.aktions

    aktions_with_title = get_items_titles_translations(aktions, locale)

    media_container_ids_by_element_id, medias_by_media_container_ids = get_media_sub_hashes('Aktion')

    # 7. Add the medias to the portraits
    aktions_with_title.map { |act| act.merge({media: medias_by_media_container_ids[media_container_ids_by_element_id[act[:item_id]]]}) }
  end

  def self.for_home_page(locale)
    aktions = Aktion.where(status: ["published", "featured"]).includes(:country)

    items_with_title = get_items_titles_translations(aktions, locale)

    media_container_ids_by_element_id, medias_by_media_container_ids = get_media_sub_hashes('Aktion')

    add_medias_categories_and_countries_to_items(
      items_with_title,
      media_container_ids_by_element_id,
      medias_by_media_container_ids,
      locale
    )
  end

  def media_containers_for_carousel
    MediaContainer.for_carousel_for('Aktion', id)
  end

  private

  def self.get_items_titles_translations(items, locale)
    # 2. Select all the aktion translation in the current locale corresponding to the aktions
    locale_item_translations = Aktion::Translation.where(locale: locale || I18n.default_locale, aktion_id: items.map { |a| a.id })

    # 3. Create an array of hashes with the portraits and the corresponding title
    i = -1
    locale_item_translations.map do |item|
      i = i + 1
      {
        item_id: item.aktion_id,
        title: item.title,
        item: items[i]
      }
    end
  end

  def self.get_media_sub_hashes(picturizable_type)
    # 4. Select all the picturizings associated with the Aktion type and flagged as for card
    picturizings = Picturizing.where(for_card: 'true', picturizable_type: picturizable_type)
    # 5. Create a hashmap of the media_container_ids by portrait_id
    media_container_ids_by_element_id = Hash[picturizings.map { |p| [p.picturizable_id, p.media_container_id] }]
    # 6. Select the mediaContainers corresponding to the picturizings (uniq allows to select the mediaContainers only once and sort to sort them for perf)
    media_containers = MediaContainer.find(picturizings.map { |p| p.media_container_id }.uniq.sort)
    # 6. Create a hashmap of the medias url (in size for_card) by mediaContainerIds
    medias_by_media_container_ids = Hash[media_containers.map { |md| [md.id, md.media(:for_card)] }]

    return media_container_ids_by_element_id, medias_by_media_container_ids
  end

  def self.add_medias_categories_and_countries_to_items(items_with_title, media_container_ids_by_element_id, medias_by_media_container_ids, locale)
    country_name_translations = Hash[Country::Translation.where(locale: locale || I18n.default_locale).map { |ct| [ct.country_id, ct.name] }]

    # 7. Add the medias to the portraits
    items_with_title.map do |item|
      item[:item].country_id
      item.
        merge({media: medias_by_media_container_ids[media_container_ids_by_element_id[item[:item_id]]]}).
        merge({category: item[:item].categories.first }).
        merge({country_name: country_name_translations[item[:item].country_id]})
    end
  end
end


# class CreateAktions < ActiveRecord::Migration
#   def up
#     create_table :aktions do |t|
#       t.integer :country_id, :null => false
#       t.string :title, :null => false
#       t.text :body
#       t.text :teaser
#       t.string :status, :null => false
#       t.datetime :posted_at, :null => false
#       t.datetime :aktion_date, :null => false

#       t.timestamps null: false
#     end
#     Aktion.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
#   end

#   def down
#     drop_table :aktions
#     Ackion.drop_translation_table!
#   end
# end
