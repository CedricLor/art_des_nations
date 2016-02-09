class CreateMediaContainers < ActiveRecord::Migration
  def up
    create_table :media_containers do |t|
      t.string :source_url
      t.date :creation_date
      t.string :author

      t.timestamps null: false
    end
    MediaContainer.create_translation_table! :title => :string
  end

  def down
    drop_table :media_containers
    MediaContainer.drop_translation_table!
  end
end
