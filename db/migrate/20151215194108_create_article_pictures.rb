class CreateArticlePictures < ActiveRecord::Migration
  def up
    create_table :article_pictures do |t|
      t.integer :article_id
      t.integer :media_container_id
      t.string  :for_card
      t.string  :for_carousel
    end

    add_index :article_pictures, :media_container_id
    add_index :article_pictures, :article_id

    ArticlePicture.create_translation_table! :for_card => :string, :for_carousel => :string
  end

  def down
    drop_table :article_pictures
    ArticlePicture.drop_translation_table!
  end
end
