class CreatePortraitizings < ActiveRecord::Migration
  def up
    create_table :portraitizings do |t|
      t.integer :portrait_id, :null => false
      t.integer :portraitizable_id, :null => false
      t.string  :portraitizable_type, :null => false, :limit => 20, default: ''
    end

    add_index :portraitizings, :portrait_id
    add_index :portraitizings, [:portraitizable_id, :portraitizable_type], name: :index_portraitizings_on_portraitizable_id_and_type

  end

  def down
    drop_table :portraitizings
  end
end
