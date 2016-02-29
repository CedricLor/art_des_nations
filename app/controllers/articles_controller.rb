class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :destroy]
  before_action :set_article_creation_form, only: [:new, :create]
  before_action :set_article_update_form, only: [:edit, :update]
  before_action :set_item_i18n_name
  before_action :clean_up_posted_at_params, only: [:create, :update]
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
      if @article.submit(params[:article])
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
      if @article.submit(params[:article])
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
      @article = Article.find(params[:id])
    end

    def set_article_creation_form
      @article = ArticleCreationForm.new
      @url = articles_path
      @method = "post"
    end

    def set_article_update_form
      @article = ArticleUpdateForm.new(id: params[:id])
      @url = article_path(params[:id])
      @method = "put"
    end

    def clean_up_posted_at_params
      article = params[:article]
      article[:posted_at] = Date.new article["posted_at(1i)"].to_i, article["posted_at(2i)"].to_i, article["posted_at(3i)"].to_i
      params[:article] = article.except('posted_at(1i)', 'posted_at(2i)', 'posted_at(3i)')
    end

    def set_item_i18n_name
      @the_item_i18n_name = t(:the_item_article, default: 'the article')
      @this_item_i18n_name = t(:this_item_article, default: 'this article')
      @an_item_i18n_name = t(:an_item_article, default: 'an article')
    end
end
