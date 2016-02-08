class CreateCategorizings < ActiveRecord::Migration
  def up
    create_table :categorizings do |t|
      t.integer :category_id, :null => false
      t.integer :categorizable_id, :null => false
      t.string  :categorizable_type, :null => false, :limit => 20
    end

    add_index :categorizings, :category_id
    add_index :categorizings, [:categorizable_id, :categorizable_type], name: :index_categorizings_on_categorizable_id_and_type

  end

  def down
    drop_table :categorizings
  end
end
