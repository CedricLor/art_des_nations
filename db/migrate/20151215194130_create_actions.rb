class CreateActions < ActiveRecord::Migration
  def up
    create_table :actions do |t|
      t.integer :country_id, :null => false
      t.string :title, :null => false
      t.text :body
      t.text :teaser
      t.string :status, :null => false
      t.datetime :posted_at, :null => false
      t.datetime :action_date, :null => false

      t.timestamps null: false
    end
    Action.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
  end

  def down
    drop_table :actions
    Action.drop_translation_table!
  end
end
