class CreateCategories < ActiveRecord::Migration
  def up
    create_table :categories do |t|
      t.timestamps null: false
    end
    Category.create_translation_table! :name => {:type => :string, :null => false, default: ''},
      editorial: {type: :text, null: false, default: ''}
  end

  def down
    drop_table :categories
    Category.drop_translation_table!
  end
end
