class CreateGalleries < ActiveRecord::Migration
  def up
    create_table :galleries do |t|
      t.string :title

      t.timestamps null: false
    end
    Gallery.create_translation_table! :title => :string
  end

  def down
    drop_table :galleries
    Gallery.drop_translation_table!
  end
end
