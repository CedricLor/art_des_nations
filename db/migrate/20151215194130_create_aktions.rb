class CreateAktions < ActiveRecord::Migration
  def up
    create_table :aktions do |t|
      t.integer :country_id, :null => false
      t.datetime :posted_at, :null => false
      t.datetime :aktion_date, :null => false

      t.timestamps null: false
    end

    add_index :aktions, :country_id
    add_index :aktions, :posted_at
    add_index :aktions, :aktion_date

    Aktion.create_translation_table! :title => {:type => :string, :null => false, default: ''},
      :body => {type: :text, null: false, default: ''},
      :teaser => {type: :text, null: false, default: ''},
      :status => {type: :text, null: false, default: 'draft', limit: 10}
  end

  def down
    drop_table :aktions
    Aktion.drop_translation_table!
  end
end
