class CreateArticles < ActiveRecord::Migration
  def up
    create_table :articles do |t|
      t.string :title
      t.text :body
      t.text :teaser
      t.string :status
      t.datetime :posted_at

      t.timestamps null: false
    end
    Article.create_translation_table! :title => :string, :body => :text, :teaser => :text
  end

  def down
    drop_table :articles
    Article.drop_translation_table!
  end
end
