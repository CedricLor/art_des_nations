class CreateArticleLinkings < ActiveRecord::Migration
  def up
    create_table :article_linkings do |t|
      t.integer :article_id, :null => false
      t.integer :article_linkable_id, :null => false
      t.string  :article_linkable_type, :null => false
    end

    add_index :article_linkings, :article_id
    add_index :article_linkings, [:article_linkable_id, :article_linkable_type], name: :index_article_linkings_on_linkable_id_and_type

  end

  def down
    drop_table :article_linkings
  end
end
