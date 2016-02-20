class CreateLinkings < ActiveRecord::Migration
  def up
    create_table :linkings do |t|
      t.integer :from_linkable_id, :null => false
      t.string  :from_linkable_type, :null => false, default: '', :limit => 20
      t.integer :to_linkable_id, :null => false
      t.string  :to_linkable_type, :null => false, default: '', :limit => 20
    end

    add_index :linkings, [:from_linkable_id, :from_linkable_type], name: :index_from_linkable
    add_index :linkings, [:to_linkable_id, :to_linkable_type], name: :index_to_linkable

  end

  def down
    drop_table :linkings
  end
end
