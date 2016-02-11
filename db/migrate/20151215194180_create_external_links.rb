class CreateExternalLinks < ActiveRecord::Migration
  def up
    create_table :external_links do |t|
      t.string :url, :null => false, default: ''

      t.timestamps null: false
    end
    ExternalLink.create_translation_table! :name => {:type => :string, :null => false, default: ''}
  end

  def down
    drop_table :external_links
    ExternalLink.drop_translation_table!
  end
end
