class CreateCountries < ActiveRecord::Migration
  def up
    create_table :countries do |t|
      t.timestamps null: false
    end
    Country.create_translation_table! :name => {:type => :string, :null => false, default: ''},
      :title => {:type => :string, :null => false, default: ''},
      :editorial => {:type => :text, null: false, default: ''}
  end

  def down
    drop_table :countries
    Country.drop_translation_table!
  end
end
