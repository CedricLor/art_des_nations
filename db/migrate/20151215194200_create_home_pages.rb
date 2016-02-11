class CreateHomePages < ActiveRecord::Migration
  def up
    create_table :home_pages do |t|

      t.timestamps null: false
    end
    HomePage.create_translation_table! call_to_action: {type: :text, null: false, default: ''},
      editorial: {type: :text, null: false, default: ''}
  end

  def down
    drop_table :home_pages
    HomePage.drop_translation_table!
  end
end
