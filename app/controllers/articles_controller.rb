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
    @article = Article.find(params[:id])
    render json: @article, root: false
  end

  def new
    @article_form = ArticleCreationForm.new
  end

  def create

    respond_to do |format|
      if @article_form.save
          format.html {redirect_to articles_path, notice: "The article has been successfully created."}
          format.json {render json: @article, root: false}
      else
          format.html {render action: "new"}
          format.json {render json: @article.errors, status: :unprocessable_entity}
      end
    end

    # if params.has_key?("article_form")
    #   create_from_rails(params)
    # else
    #   create_from_react(params)
    # end
  end

  def edit
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

  def article_params
    params.require(:article).permit(:title, :body, :teaser, :posted_at, :status)
  end

  def create_from_rails(params)
    @article_form = ArticleCreationForm.new(params[:article_form])

    if @article_form.save
        redirect_to articles_path, notice: "The article has been successfully created."
    else
        render action: "new"
    end
  end

  def create_from_react(params)
    @article = Article.new(article_params)

    if @article.save
      render json: @article, root: false
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end
end
