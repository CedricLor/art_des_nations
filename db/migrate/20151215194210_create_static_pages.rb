class CreateStaticPages < ActiveRecord::Migration
  def up
    create_table :static_pages do |t|

      t.timestamps null: false
    end
    StaticPage.create_translation_table! :title => {type: :string, null: false, default: ''},
      :body => {type: :text, null: false, default: ""},
      :teaser => {type: :text, null: false, default: ""}
  end

  def down
    drop_table :static_pages
    StaticPage.drop_translation_table!
  end
end
