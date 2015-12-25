class CreateMediaContainers < ActiveRecord::Migration
  def up
    create_table :media_containers do |t|
      t.string :title
      t.string :author
      t.string :source
      t.date :creation_date

      t.timestamps null: false
    end
    MediaContainer.create_translation_table! :title => :string, :author => :string, :source => :string
  end

  def down
    drop_table :media_containers
    MediaContainer.drop_translation_table!
  end
end