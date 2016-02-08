# class CreateArticlePictures < ActiveRecord::Migration
#   def up
#     create_table :article_pictures do |t|
#       t.integer :article_id
#       t.integer :media_container_id
#       t.string  :for_card
#       t.string  :for_carousel
#     end

#     add_index :article_pictures, :media_container_id
#     add_index :article_pictures, :article_id

#     ArticlePicture.create_translation_table! :for_card => :string, :for_carousel => :string
#   end

#   def down
#     drop_table :article_pictures
#     ArticlePicture.drop_translation_table!
#   end
# end

class CreatePicturizings < ActiveRecord::Migration
  def up
    create_table :picturizings do |t|
      t.integer :media_container_id, :null => false
      t.integer :picturizable_id, :null => false
      t.string  :picturizable_type, :null => false, :limit => 20
      t.string  :for_card, :null => false, :limit => 8
      t.string  :for_carousel, :null => false, :limit => 12
    end

    add_index :picturizings, :media_container_id
    add_index :picturizings, [:picturizable_id, :picturizable_type]

    Picturizing.create_translation_table! :for_card => :string, :for_carousel => :string
  end

  def down
    drop_table :picturizings
    Picturizing.drop_translation_table!
  end
end
