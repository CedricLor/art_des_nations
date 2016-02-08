class CreateCountries < ActiveRecord::Migration
  def up
    create_table :countries do |t|
      t.string :name, :null => false
      t.text :editorial, :null => false

      t.timestamps null: false
    end
    Country.create_translation_table! :name => :string, :editorial => :text
  end

  def down
    drop_table :countries
    Country.drop_translation_table!
  end
end
