class StaticPage < ActiveRecord::Base
  validates :title, presence: true
  validates :body, presence: true

  translates :title, :body, :teaser, :fallbacks_for_empty_translations => true

  def to_param
    "#{id}-#{title.parameterize}"
  end

end


# class CreateStaticPages < ActiveRecord::Migration
#   def up
#     create_table :static_pages do |t|
#       t.string :title
#       t.text :body

#       t.timestamps null: false
#     end
#     StaticPage.create_translation_table! :title => :string, :body => :text
#   end

#   def down
#     drop_table :static_pages
#     StaticPage.drop_translation_table!
#   end
# end
