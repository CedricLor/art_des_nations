class ArticlesController < ApplicationController

  def index
    @feed = Feed.new(articles: Article.all)
    # SIMPLE STACK WITH CURRENT REDUX STORE
    render json: @feed.articles, each_serializer: ArticleSerializer

    # BLOATED STACK WITH FUTURE STORE
    # b = ArticlesCustomSerializer.new(articles: @feed.articles).serialize_as_hash
    # render json: b

    # UNCOMMENT THE FOLLOWING THREE LINES
    # a = ActiveModel::ArraySerializer.new(@feed.articles, each_serializer: ArticleSerializer).as_json
    # b = {}
    # a.each { |item| b[item['id']] = item.keep_if{|key, value| key != "id"}}
    # render json: b.as_json

    # @articles = Article.order(created_at: :desc).limit(20)
    # render json: @articles, root: false, each_serializer: ArticleSerializer
  end

  def show
    # Used by Rails only
    @article = Article.find(params[:id])
    render json: @article, serializer: ArticleSerializer
  end

  def new
    @article_form = ArticleCreationForm.new
  end

  def create
    params.has_key?("media_file") ? create_from_react : @article_form = ArticleCreationForm.new(article_creation_params(:article_creation_form))

    if @article_form.save
      render json: @article_form.article, serializer: ArticleSerializer
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  def edit
    # Used by Rails only
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
    if @article.update(article_params)
      render json: @article, root: false
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

  def article_creation_params(required_root_param)
    params.require(required_root_param).permit(:title, :teaser, :posted_at, :status, :media_file)
  end

  def article_params
    params.require(:article).permit(:title, :body, :teaser, :posted_at, :status)
  end

  def create_from_react
    params[:article_form] = JSON.parse(params[:article_form])
    params[:article_form]["media_file"] = params[:media_file]
    @article_form = ArticleCreationForm.new(article_creation_params(:article_form))
  end
end
