class CreateAuthors < ActiveRecord::Migration
  def up
    create_table :authors do |t|
      t.string :full_name, null: false, default: ''

      t.timestamps null: false
    end
  end

  def down
    drop_table :authors
  end
end
