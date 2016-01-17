class ArticlesController < ApplicationController

  def index
    @articles = Article.order("posted_at DESC")
    render json: @articles
  end

  def show
    @article = Article.find(params[:id])
    render json: @article
  end

  def new
    @article_form = ArticleForm.new
  end

  # def create
  #   @article_form = ArticleForm.new(params[:article_form])
  #       redirect_to articles_path, notice: "The article has been successfully created." }
  #   else
  #       render action: "new"
  #   end
  # end

  def create
    if params.has_key?("article_form")
      create_from_rails(params)
    else
      create_from_react(params)
    end
  end

  def create_from_rails(params)
    @article_form = ArticleForm.new(params[:article_form])

    if @article_form.save
        redirect_to articles_path, notice: "The article has been successfully created."
    else
        render action: "new"
    end
  end

  def create_from_react(params)
    @article = Article.new(article_params)

    if @article.save
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    head :no_content
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :teaser, :posted_at, :status)
  end

  def create_from_rails(params)
    @article_form = ArticleForm.new(params[:article_form])

    if @article_form.save
        redirect_to articles_path, notice: "The article has been successfully created."
    else
        render action: "new"
    end
  end

  def create_from_react(params)
    @article = Article.new(article_params)

    if @article.save
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end
end
