class CreateArticles < ActiveRecord::Migration
  def up
    create_table :articles do |t|
      t.string :title, :null => false
      t.text :body
      t.text :teaser
      t.string :status, :null => false
      t.datetime :posted_at, :null => false

      t.timestamps null: false
    end
    Article.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
  end

  def down
    drop_table :articles
    Article.drop_translation_table!
  end
end
