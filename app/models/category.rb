class Category < ActiveRecord::Base
  validates :name, presence: true

  # default_scope { order(name: :asc) }

  has_many :categorizings, inverse_of: :category
  has_many :articles, through: :categorizings, :source => :categorizable,
           :source_type => 'Article'
  has_many :actions, through: :categorizings, :source => :categorizable,
           :source_type => 'Action'

  translates :name, :editorial, :fallbacks_for_empty_translations => true
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
