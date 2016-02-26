class DestroyFriendlyIds < ActiveRecord::Migration
  def change
    drop_table :friendly_id_slugs
    remove_column :portraits, :slug_en
    remove_column :portraits, :slug_fr
    remove_column :portraits, :slug_ru
    remove_column :portraits, :slug_zh_CN
  end
end
