class CreateJoinTableArticleGallery < ActiveRecord::Migration
  def change
    create_table :articles_galleries, id: false do |t|
      t.integer :article_id
      t.integer :gallery_id
    end

    add_index :articles_galleries, :gallery_id
    add_index :articles_galleries, :article_id
  end
end
