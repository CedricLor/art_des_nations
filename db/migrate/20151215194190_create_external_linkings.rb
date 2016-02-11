class CreateExternalLinkings < ActiveRecord::Migration
  def up
    create_table :external_linkings do |t|
      t.integer :external_link_id, :null => false
      t.integer :external_linkable_id, :null => false
      t.string  :external_linkable_type, :null => false, default: '', :limit => 20
    end

    add_index :external_linkings, :external_link_id
    add_index :external_linkings, [:external_linkable_id, :external_linkable_type], name: :index_external_linkings_on_linkable_id_and_type

  end

  def down
    drop_table :external_linkings
  end
end
