class CreateHomePages < ActiveRecord::Migration
  def up
    create_table :home_pages do |t|
      t.integer :article_id, :null => false

      t.timestamps null: false
    end
    HomePage.create_translation_table! call_to_action: :text
  end

  def down
    drop_table :home_pages
    HomePage.drop_translation_table!
  end
end
