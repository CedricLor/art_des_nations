class Category < ActiveRecord::Base
  validates :name, presence: true

  # default_scope { order(name: :asc) }

  has_many :categorizings, inverse_of: :category
  has_many :articles, through: :categorizings, :source => :categorizable,
           :source_type => 'Article'
  has_many :aktions, through: :categorizings, :source => :categorizable,
           :source_type => 'Aktion'

  translates :name, :editorial, :fallbacks_for_empty_translations => true


  def self.categorized_articles_and_aktions_for_category(category_id)
    articles = Article.where(status: ["published", "featured"]).
      includes([
        :categories,
        picturizings: [:translations, [media_container: :translations]]
      ]).
      where(picturizing_translations: {for_card: "true"}).
      where(categories: {id: category_id})

    aktions = Aktion.where(status: ["published", "featured"]).
      includes([
        :categories,
        picturizings: [:translations, [media_container: :translations]]
      ]).
      where(picturizing_translations: {for_card: "true"}).
      where(categories: {id: category_id})

    articles_aktions = (articles + aktions).sort { |a, b| b.date_sorting_field <=> a.date_sorting_field }

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
