ActiveAdmin.register Article do

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


  permit_params :id, :posted_at, :created_at, :update_at, :title,
    translations_attributes: [:id, :locale, :title, :body, :teaser, :posted_from_location, :status, :_destroy]

  index do
    selectable_column
    column :title
    # translation_status
    translation_status_flags
    column :posted_at
    column :status
    actions
  end

  # index do
  # #   # textual translation status
  # #   # translation_status
  # #   # or with flag icons
  #   translation_status_flags
  # #   # ...
  # #   # default_actions
  #   actions
  # end

  controller do
    def create
      byebug
      @article = Article.new(permitted_params[:article])

      if @article.save
        redirect_to @article, notice: 'Article was successfully created.'
      else
        render action: 'new'
      end
    end
  end

  # Single article form
  form do |f|
    f.inputs "Titre" do
      Globalize.with_locale(:fr) do
        f.input :title, label: 'Titre'
      end
    end
    f.inputs "Contenu" do
      f.translated_inputs '', switch_locale: true do |t|
        t.input :title, label: 'Titre'
        t.input :teaser, label: 'Chapeau de l\'article'
        t.input :body, label: 'Corps de l\'article'
        t.input :posted_from_location, label: 'Lieu de publication.'
        t.input :status, :as => :radio, :collection => ["draft", "published", "featured", "archived"]
      end
    end
    f.inputs 'Détails' do
      f.input :posted_at, label: 'Date et heure de publication'
    end
    f.inputs 'Champs techniques' do
      f.input :id
      f.input :created_at
      f.input :updated_at
    end

    f.actions

  end


end
