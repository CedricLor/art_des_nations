class CreateArticles < ActiveRecord::Migration
  def up
    create_table :articles do |t|
      t.integer :author_id, :null => false
      t.datetime :posted_at, :null => false

      t.timestamps null: false
    end
    Article.create_translation_table! :title => {:type => :string, :null => false, default: ''},
      :body => {type: :text, null: false, default: ''},
      :teaser => {type: :text, null: false, default: ''},
      :posted_from_location => {type: :string, null: false, limit: 25, default: ''},
      :status => {:type => :string, null: false, limit: 10, default: 'draft'}
  end

  def down
    drop_table :articles
    Article.drop_translation_table!
  end
end
