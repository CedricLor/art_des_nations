ActiveAdmin.register Article::Translation do

# # See permitted parameters documentation:
# # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
# #
# # permit_params :list, :of, :attributes, :on, :model
# #
# # or
# #
# # permit_params do
# #   permitted = [:permitted, :attributes]
# #   permitted << :other if resource.something?
# #   permitted
# # end

permit_params :id, :article_id, :locale, :created_at, :updated_at, :title, :body, :teaser, :posted_from_location, :status

end
