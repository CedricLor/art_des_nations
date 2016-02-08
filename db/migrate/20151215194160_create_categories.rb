class CreateCategories < ActiveRecord::Migration
  def up
    create_table :categories do |t|
      t.string :name, :null => false
      t.text :editorial

      t.timestamps null: false
    end
    Category.create_translation_table! :name => :string, :editorial => :text
  end

  def down
    drop_table :categories
    Category.drop_translation_table!
  end
end
