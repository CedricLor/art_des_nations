class CreateStaticPages < ActiveRecord::Migration
  def up
    create_table :static_pages do |t|
      t.string :title
      t.text :body
      t.text :teaser

      t.timestamps null: false
    end
    StaticPage.create_translation_table! :title => :string, :body => :text, :teaser => :text
  end

  def down
    drop_table :static_pages
    StaticPage.drop_translation_table!
  end
end
