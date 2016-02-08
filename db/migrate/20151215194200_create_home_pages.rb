class CreateHomePages < ActiveRecord::Migration
  def up
    create_table :home_pages do |t|
      t.string :call_to_action
      t.string :call_to_action_url
      t.integer :article_id, :null => false

      t.timestamps null: false
    end
    HomePage.create_translation_table! :call_to_action => :string
  end

  def down
    drop_table :home_pages
    HomePage.drop_translation_table!
  end
end
