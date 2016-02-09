class CreateMediaContainers < ActiveRecord::Migration
  def up
    create_table :media_containers do |t|
      t.string :source_url, null: false, default: ''
      t.date :creation_date
      t.string :author, null: false, default: ''

      t.timestamps null: false
    end
    MediaContainer.create_translation_table! :title => {type: :string, null: false, default: ''}
  end

  def down
    drop_table :media_containers
    MediaContainer.drop_translation_table!
  end
end
