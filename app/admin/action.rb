ActiveAdmin.register Action do

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

  permit_params :country_id, :title, :teaser, :body, :status, :posted_at, :action_date

  index do
    selectable_column
    column :country_id
    column :title
    column :status
    column :posted_at
    column :action_date
    actions
  end

  form do |f|
    f.inputs "Titre" do
      f.input :title
    end
    f.inputs "Contenu" do
      f.input :teaser
      f.input :body
    end
    f.inputs "Dates" do
      f.input :posted_at
      f.input :action_date
    end
    f.actions
  end

end



# class CreateActions < ActiveRecord::Migration
#   def up
#     create_table :actions do |t|
#       t.integer :country_id, :null => false
#       t.string :title, :null => false
#       t.text :body
#       t.text :teaser
#       t.string :status, :null => false
#       t.datetime :posted_at, :null => false
#       t.datetime :action_date, :null => false

#       t.timestamps null: false
#     end
#     Action.create_translation_table! :title => :string, :body => :text, :teaser => :text, :status => :string
#   end

#   def down
#     drop_table :actions
#     Action.drop_translation_table!
#   end
# end