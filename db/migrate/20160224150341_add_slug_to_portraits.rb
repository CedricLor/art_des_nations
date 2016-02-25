class AddSlugToPortraits < ActiveRecord::Migration
  def up
    add_column :portraits, :slug_en, :string
    add_column :portraits, :slug_fr, :string
    add_column :portraits, :slug_ru, :string
    add_column :portraits, :slug_zh_CN, :string
    add_index :portraits, :slug_en, unique: true
    add_index :portraits, :slug_fr, unique: true
    add_index :portraits, :slug_ru, unique: true
    add_index :portraits, :slug_zh_CN, unique: true
  end

  def down
    remove_column :portraits, :slug_en
    remove_column :portraits, :slug_fr
    remove_column :portraits, :slug_ru
    remove_column :portraits, :slug_zh_CN
  end
end
