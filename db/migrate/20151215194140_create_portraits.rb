class CreatePortraits < ActiveRecord::Migration
  def up
    create_table :portraits do |t|
      t.timestamps null: false
    end
    Portrait.create_translation_table! :title => {:type => :string, :null => false, default: ''},
      :body => {type: :text, null: false, default: ''},
      :teaser => {type: :text, null: false, default: ''},
      :status => {type: :text, null: false, default: 'draft', limit: 10}
  end

  def down
    drop_table :portraits
    Portrait.drop_translation_table!
  end
end
