class ArticleForm < AktionArticleForm

  def self.model_name
    ActiveModel::Name.new(self, nil, "Article")
  end

  validates :posted_from_location, presence: true
  validates :author_name, presence: true

  def set_attributes(params)
    super
    self.author_name = params[:author_name]
    params.slice(:body, :title, :teaser, :posted_from_location, :posted_at, :status).each do |param|
      article.attributes = {param[0] => param[1]}
    end
  end

  def persist!
    @author = Author.find_or_create_by(full_name: author_name)
    @main_model.author_id = @author.id
    super
  end
end
