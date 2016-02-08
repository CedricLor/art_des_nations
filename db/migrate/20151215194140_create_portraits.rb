class CreatePortraits < ActiveRecord::Migration
  def up
    create_table :portraits do |t|
      t.timestamps null: false
    end
    Portrait.create_translation_table! :title => {:type => :string, :null => false},
      :body => :text, :teaser => :text,
      :status => {:type => :string, :null => false}
  end

  def down
    drop_table :portraits
    Portrait.drop_translation_table!
  end
end
