ActiveAdmin.register MediaContainer do
  config.filters = false
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if resource.something?
#   permitted
# end

  permit_params :id, :media, :title, :author, :source_url, :creation_date

  index do
    selectable_column
    column :title
    column :author
    column :source_url
    column :creation_date
    actions
  end

  form do |f|
    f.inputs "Photos" do
      f.input :media
    end
    f.inputs "Méta-données" do
      f.input :title
      f.input :author
      f.input :source_url
      f.input :creation_date
    end
    f.actions
  end


end

# class CreateMediaContainers < ActiveRecord::Migration
#   def up
#     create_table :media_containers do |t|
#       t.string :title
#       t.string :author
#       t.string :source_url
#       t.date :creation_date

#       t.timestamps null: false
#     end
#     MediaContainer.create_translation_table! :title => :string, :author => :string
#   end

#   def down
#     drop_table :media_containers
#     MediaContainer.drop_translation_table!
#   end
# end
