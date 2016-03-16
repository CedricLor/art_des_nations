class ArticlesController < ApplicationController
  include OgMetaTagsSetter
  before_action :set_article, only: [:show, :destroy]
  before_action :clean_up_posted_at_params, only: [:create, :update]
  before_action :set_article_creation_form, only: [:new, :create]
  before_action :set_article_update_form, only: [:edit, :update]
  before_action :set_item_i18n_name
  before_action :set_items_i18n_name, only: [:index]
  skip_before_action :authenticate_user!, only: :show


  # GET /articles
  # GET /articles.json
  def index
    @articles = Article.includes(:author, :translations).
      includes(picturizings: [:translations, :media_container])

    respond_to do |format|
      format.html {render :layout => 'application'} # index.html.erb
      format.json { render json: @articles }
    end
  end

  # GET /articles/1
  # GET /articles/1.json
  def show
    @media_containers = @article.media_containers_for_carousel
    set_og_meta_tags(@article)

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @article }
    end
  end

  # GET /articles/new
  def new
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles
  # POST /articles.json
  def create
    respond_to do |format|
      if @article.submit
        format.html { redirect_to @article.article, notice: 'The new article was successfully created.' }
        format.json { render json: @article.article, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    respond_to do |format|
      if @article.submit
        format.html { redirect_to @article.article, notice: 'The article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    ArticleDestroy.destroy(@article)
    respond_to do |format|
      format.html { redirect_to articles_url, notice: 'The article was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @item = @article = Article.includes(:author).find(params[:id])
    end

    def set_article_creation_form
      @article = ArticleCreationForm.new(params[:article])
      @url = articles_path
      @method = "post"
    end

    def set_article_update_form
      @item = @article = ArticleUpdateForm.new(params[:article] ? {id: params[:id]}.merge(params[:article]) : {id: params[:id]})
      @url = article_path(params[:id])
      @method = "put"
    end

# {"utf8"=>"✓", "_method"=>"put", "authenticity_token"=>"5K637mJtuxX8LF/fWerfIZbkj9DEB0TW33Yai5+kCM9PuSCATQPTlCX6hNNq/9OSY3kMSX+EN43Wvvjuyvd7zA==",
#   "article"=>{
#     "title"=>"Test look for bug",
#     "teaser"=>"",
#     "new_md"=>{
#       "0"=>{"title"=>"", "for_carousel"=>"true"},
#       "1"=>{"title"=>"", "for_carousel"=>"true"},
#       "2"=>{"title"=>"", "for_carousel"=>"true"}},
#     "body"=>"",
#     "author_name"=>"Guillaume Mattéo",
#     "posted_at(3i)"=>"4",
#     "posted_at(2i)"=>"3",
#     "posted_at(1i)"=>"2016",
#     "posted_from_location"=>"Paris",
#     "applicable_existing_categories"=>{"2"=>"false", "4"=>"true", "5"=>"false", "6"=>"false", "7"=>"false", "1"=>"false", "8"=>"false", "3"=>"false", "9"=>"false"},
#     "main_category_id"=>"4",
#     "new_category_name"=>"",
#     "status"=>"draft"},
#   "commit"=>"Sauvegardez vos changements", "controller"=>"articles", "action"=>"update", "id"=>"28-test-look-for-bug"}

# {"_method"=>"patch", "authenticity_token"=>"y1Q5kxysg15pSwuwFawITHEb6qfzF9FIxdoo6Q7QexxgQ679M8Lr37Cd0LwmuQT/hIZpPkiUohPMEsqMW4MIHw==", "article"=>{"status"=>"published"}, "controller"=>"articles", "action"=>"update", "id"=>"28"}
    def clean_up_posted_at_params
      if params[:article]["posted_at(1i)"].present?
        article = params[:article]
        article[:posted_at] = Date.new article["posted_at(1i)"].to_i, article["posted_at(2i)"].to_i, article["posted_at(3i)"].to_i
        params[:article] = article.except('posted_at(1i)', 'posted_at(2i)', 'posted_at(3i)')
      end
    end

    def set_item_i18n_name
      @the_item_i18n_name = t(:the_item_article, default: 'the article')
      @this_item_i18n_name = t(:this_item_article, default: 'this article')
      @an_item_i18n_name = t(:an_item_article, default: 'an article')
      @item_i18n_name = t(:item_article, default: 'Article')
    end

    def set_items_i18n_name
      @item_i18n_name = @item_i18n_name.pluralize
    end
end
