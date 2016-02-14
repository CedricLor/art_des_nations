class CreateSiteEditorials < ActiveRecord::Migration
  def up
    create_table :site_editorials do |t|
      t.integer :home_page_id, :null => false, default: 1
      t.timestamps null: false
    end
    SiteEditorial.create_translation_table! title: {type: :string, null: false, default: ''},
      body: {type: :text, null: false, default: ''},
      status: {type: :text, null: false, default: 'draft', limit: 10}

  end

  def down
    drop_table :site_editorials
    SiteEditorial.drop_translation_table!
  end
end
