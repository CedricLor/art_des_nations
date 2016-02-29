class ArticleForm
  include ActiveModel::Model
  include AktionArticlePictures
  include AktionArticlePortraitCategories

  def self.model_name
    ActiveModel::Name.new(self, nil, "Article")
  end

  validates :title, presence: true
  validates :posted_at, presence: true
  validates :posted_from_location, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an article. Choose between draft, published, featured or archived" }
  validates :author_name, presence: true
  validate :has_at_least_one_category_if_featured_or_published

  def set_attributes(params)
    self.author_name = params[:author_name]
    self.for_card = params[:for_card]
    self.new_md = params[:new_md]
    self.applicable_existing_categories = params[:applicable_existing_categories]
    self.main_category_id = params[:main_category_id]
    self.new_category_name = params[:new_category_name]
    params.slice(:body, :title, :teaser, :posted_from_location, :posted_at, :status).each do |param|
      article.attributes = {param[0] => param[1]}
    end
  end

  def persist_ancillary_data
    persist_categories(
      @article,
      "Article",
      applicable_existing_categories,
      main_category_id,
      new_category_name
    )
  end

  def has_at_least_one_category_if_featured_or_published
    if applicable_existing_categories_all_false && main_category_id.blank? && new_category_name.blank? && ["published", "featured"].include?(status)
      errors.add(:categories, I18n.t(
        :missing_categories_error,
        item_name: model_name.name.downcase,
        published: I18n.t(:published),
        featured: I18n.t(:featured),
        default: "You cannot choose the status \"#{I18n.t(:published)}\" or \"#{I18n.t(:featured)}\" without giving at least one category to your #{model_name.name.downcase}."))
    end
  end

  def applicable_existing_categories_all_false
    applicable_existing_categories.select{|k,v| v == "true"}.length == 0 ? true : false
  end
end
