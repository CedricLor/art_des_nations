class HomePage < ActiveRecord::Base
  has_many :external_linkings, :as => :external_linkable, inverse_of: :home_page
  has_many :external_links, through: :external_linkings
  has_many :site_editorials, inverse_of: :home_page

  translates :call_to_action, :fallbacks_for_empty_translations => true

  def site_editorial
    SiteEditorial.where(status: "published").last
  end

  def editorial
    site_editorial.body
  end

  def editorial_id
    site_editorial.id
  end

  def editorial=(value)
    SiteEditorial.where(status: "published").last.update!(
      body: value
    )
  end

  def short_editorial
    end_of_short_edito = editorial.index('</p>', 350) + 4
    short_editorial = editorial.slice(0, end_of_short_edito)
    if editorial.size > end_of_short_edito
      short_editorial = short_editorial + '...'
    end
    short_editorial
  end
end

# class CreateHomePages < ActiveRecord::Migration
#   def up
#     create_table :home_pages do |t|
#       t.string :call_to_action
#       t.string :call_to_action_url
#       t.integer :article_id, :null => false

#       t.timestamps null: false
#     end
#     HomePage.create_translation_table! :call_to_action => :string
#   end

#   def down
#     drop_table :home_pages
#     HomePage.drop_translation_table!
#   end
# end
