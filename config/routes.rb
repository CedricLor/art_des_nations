Rails.application.routes.draw do

  mount Ckeditor::Engine => '/ckeditor'
  devise_for :users
  as :user do
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
    put 'users' => 'devise/registrations#update', :as => 'user_registration'
  end

  scope '(:locale)', locale: /fr|en|ru|zh-CN/ do
    # FIXME -- This was for React
    # get 'article/:id' => "pages#show"

    get 'linkings/for/:linkable_type/:linkable_id', to: 'linkings#index', as: 'linkings_for'
    resources :linkings, only: [:destroy, :create]
    resources :articles
    resources :aktions
    get 'actions/:id', to: 'aktions#show', as: 'action'
    resources :portraits
    resources :categories

    resources :media_containers, only: [:index]

    resources :countries, only: [:show, :edit, :update]
    resources :portrait_intros, only: [:show, :edit, :update]
    get 'protagonistes', to: 'portrait_intros#show', as: 'protagonistes'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
    # FIXME -- This was for React
    # get 'pages/show'

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

    # FIXME -- This was the React default route
    # root to: "pages#show"
    resources :static_pages, only: [:show, :edit, :update], path: 'page'
    get 'page/:id', to: 'static_pages#show', as: 'page'

    resources :home_pages, only: [:show, :edit, :update]

    resources :external_links, only: [:create]

    resources :site_editorials, only: [:show, :new, :edit, :update, :create, :index]
    get 'editorial/:id', to: 'site_editorials#show', as: 'editorial'

    # get 'home_pages/:id' => 'home_pages#show'
    root to: "home_pages#show"

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # Redirect to the main articles React page when calling the wrong URL
  # Redirect to the home page when calling the wrong URL
  # get '*path' => redirect('/')

  end

end
