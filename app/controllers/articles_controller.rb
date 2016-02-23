class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :destroy]
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
    @article = Article.new
  end

  # GET /articles/1/edit
  def edit
    @article = Article.includes(:media_containers, :author).includes(categorizings: [category: :translations]).find(params[:id])
  end

  # POST /articles
  # POST /articles.json
  def create
    @article = Article.new(article_params)

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render json: @article, status: :created }
      else
        format.html { render action: 'new' }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
    clean_up_posted_at_params
    @article_update_form = ArticleUpdateForm.new({id: params[:id]}.merge(params[:article]))

    respond_to do |format|
      if @article_update_form.update
        format.html { redirect_to @article_update_form.article, notice: 'The article was successfully updated.' }
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
    @article.destroy
    respond_to do |format|
      format.html { redirect_to articles_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(
        :id,
        :title,
        :body,
        :teaser,
        :status,
        :posted_from_location,
        :posted_at
      )
    end

    def clean_up_posted_at_params
      article = params[:article]
      article[:posted_at] = Date.new article["posted_at(1i)"].to_i, article["posted_at(2i)"].to_i, article["posted_at(3i)"].to_i
      params[:article] = article.except('posted_at(1i)', 'posted_at(2i)', 'posted_at(3i)')
    end
end
