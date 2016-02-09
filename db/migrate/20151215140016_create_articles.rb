class CreateArticles < ActiveRecord::Migration
  def up
    create_table :articles do |t|
      t.integer :author_id, :null => false
      t.datetime :posted_at, :null => false

      t.timestamps null: false
    end
    Article.create_translation_table! :title => {:type => :string, :null => false},
      :body => :text,
      :teaser => :text,
      :posted_from_location => :text,
      :status => {:type => :string, :null => false}
  end

  def down
    drop_table :articles
    Article.drop_translation_table!
  end
end
