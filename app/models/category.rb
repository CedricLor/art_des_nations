class Category < ActiveRecord::Base
  validates :name, presence: true

  # default_scope { order(name: :asc) }

  has_many :categorizings, inverse_of: :category
  has_many :articles, through: :categorizings, :source => :categorizable,
           :source_type => 'Article'
  has_many :aktions, through: :categorizings, :source => :categorizable,
           :source_type => 'Aktion'

  translates :name, :editorial, :fallbacks_for_empty_translations => true


  def self.categorized_articles_and_aktions_for_category(category_with_articles_and_aktions, locale)
    # 2. Select the article translations in the current locale
    # FIXME -- This method is buggy if there is no translation -- fallback to default translation does not work properly
    locale_article_translations = Article::Translation.where(locale: locale || I18n.default_locale, article_id: category_with_articles_and_aktions.articles.map { |a| a.id })
    # 3. Select the aktion translations in the current locale
    locale_aktion_translations = Aktion::Translation.where(locale: locale || I18n.default_locale, aktion_id: category_with_articles_and_aktions.aktions.map { |a| a.id })

    # 4. Create an array of hashes with the articles and the corresponding titles
    i = -1
    articles_with_title = locale_article_translations.map do |at|
      i = i + 1
      {
        item_id: at.article_id,
        title: at.title,
        item: category_with_articles_and_aktions.articles[i],
        date_sorting_field: category_with_articles_and_aktions.articles[i].posted_at

      }
    end

    # 5. Create an array of hashes with the aktions and the corresponding titles
    i = -1
    aktions_with_title = locale_aktion_translations.map do |at|
      i = i + 1
      {
        item_id: at.aktion_id,
        title: at.title,
        item: category_with_articles_and_aktions.aktions[i],
        date_sorting_field: category_with_articles_and_aktions.aktions[i].aktion_date
      }
    end

    # 6. Select all the picturizings associated with the articles and flagged as for card
    article_picturizings = Picturizing.where(for_card: 'true', picturizable_type: 'Article')
    # 7. Select all the picturizings associated with the aktions and flagged as for card
    aktion_picturizings = Picturizing.where(for_card: 'true', picturizable_type: 'Aktion')

    # 8. Create a hashmap of the media_container_ids by article_id
    media_container_ids_by_article_id = Hash[article_picturizings.map { |p| [p.picturizable_id, p.media_container_id] }]
    # 9. Create a hashmap of the media_container_ids by article_id
    media_container_ids_by_aktion_id = Hash[aktion_picturizings.map { |p| [p.picturizable_id, p.media_container_id] }]

    # 10. Select the mediaContainers corresponding to the picturizings (uniq allows to select the mediaContainers only once and sort to sort them for perf)
    # a. prepare the query
    media_container_ids = article_picturizings.map { |p| p.media_container_id } + aktion_picturizings.map { |p| p.media_container_id }
    media_container_ids = media_container_ids.uniq.sort
    # b. do the query
    media_containers = MediaContainer.find(media_container_ids)
    # 11. Create a hashmap of the medias url (in size for_card) by mediaContainerIds
    medias_by_media_container_ids = Hash[media_containers.map { |md| [md.id, md.media(:for_card)] }]

    # 12. Add the medias to the articles
    articles_with_media = articles_with_title.map { |art| art.merge({media: medias_by_media_container_ids[media_container_ids_by_article_id[art[:item_id]]]}) }
    # 13. Add the medias to the aktions
    aktions_with_media = aktions_with_title.map { |act| act.merge({media: medias_by_media_container_ids[media_container_ids_by_aktion_id[act[:item_id]]]}) }

    # 14. Merge the articles and aktions arrays
    items_with_media = articles_with_media + aktions_with_media
    # 15. Sort the combined array
    items_with_media.sort { |a, b| b[:date_sorting_field] <=> a[:date_sorting_field] }
  end

end



# class CreateCategories < ActiveRecord::Migration
#   def up
#     create_table :categories do |t|
#       t.string :name, :null => false
#       t.text :editorial

#       t.timestamps null: false
#     end
#     Category.create_translation_table! :name => :string, :editorial => :text
#   end

#   def down
#     drop_table :categories
#     Category.drop_translation_table!
#   end
# end
