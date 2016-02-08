class CreatePortraits < ActiveRecord::Migration
  def up
    create_table :portraits do |t|
      t.string :title, :null => false
      t.text :body
      t.text :teaser
      t.string :status, :null => false

      t.timestamps null: false
    end
    Portrait.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
  end

  def down
    drop_table :portraits
    Portrait.drop_translation_table!
  end
end
