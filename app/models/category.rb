class Category < ActiveRecord::Base
  validates :name, presence: true

  # default_scope { order(name: :asc) }

  has_many :categorizings, inverse_of: :category
  has_many :articles, through: :categorizings, :source => :categorizable,
           :source_type => 'Article'
  has_many :actions, through: :categorizings, :source => :categorizable,
           :source_type => 'Action'

  translates :name, :editorial, :fallbacks_for_empty_translations => true


  def self.categorized_articles_and_actions_for_category(category_with_articles_and_actions, locale)
    # 2. Select the article translations in the current locale
    locale_article_translations = Article::Translation.where(locale: locale).find(category_with_articles_and_actions.articles.map { |a| a.id })
    # 3. Select the action translations in the current locale
    locale_action_translations = Action::Translation.where(locale: locale).find(category_with_articles_and_actions.actions.map { |a| a.id })

    # 4. Create an array of hashes with the articles and the corresponding titles
    i = -1
    articles_with_title = locale_article_translations.map do |at|
      i = i + 1
      {
        item_id: at.article_id,
        title: at.title,
        item: category_with_articles_and_actions.articles[i],
        date_sorting_field: category_with_articles_and_actions.articles[i].posted_at

      }
    end

    # 5. Create an array of hashes with the actions and the corresponding titles
    i = -1
    actions_with_title = locale_action_translations.map do |at|
      i = i + 1
      {
        item_id: at.action_id,
        title: at.title,
        item: category_with_articles_and_actions.actions[i],
        date_sorting_field: category_with_articles_and_actions.actions[i].action_date
      }
    end

    # 6. Select all the picturizings associated with the articles and flagged as for card
    article_picturizings = Picturizing.where(for_card: 'true', picturizable_type: 'Article')
    # 7. Select all the picturizings associated with the actions and flagged as for card
    action_picturizings = Picturizing.where(for_card: 'true', picturizable_type: 'Action')

    # 8. Create a hashmap of the media_container_ids by article_id
    media_container_ids_by_article_id = Hash[article_picturizings.map { |p| [p.picturizable_id, p.media_container_id] }]
    # 9. Create a hashmap of the media_container_ids by article_id
    media_container_ids_by_action_id = Hash[action_picturizings.map { |p| [p.picturizable_id, p.media_container_id] }]

    # 10. Select the mediaContainers corresponding to the picturizings (uniq allows to select the mediaContainers only once and sort to sort them for perf)
    # a. prepare the query
    media_container_ids = article_picturizings.map { |p| p.media_container_id } + action_picturizings.map { |p| p.media_container_id }
    media_container_ids = media_container_ids.uniq.sort
    # b. do the query
    media_containers = MediaContainer.find(media_container_ids)
    # 11. Create a hashmap of the medias url (in size for_card) by mediaContainerIds
    medias_by_media_container_ids = Hash[media_containers.map { |md| [md.id, md.media(:for_card)] }]

    # 12. Add the medias to the articles
    articles_with_media = articles_with_title.map { |art| art.merge({media: medias_by_media_container_ids[media_container_ids_by_article_id[art[:item_id]]]}) }
    # 13. Add the medias to the actions
    actions_with_media = actions_with_title.map { |act| act.merge({media: medias_by_media_container_ids[media_container_ids_by_action_id[act[:item_id]]]}) }

    # 14. Merge the articles and actions arrays
    items_with_media = articles_with_media + actions_with_media
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
