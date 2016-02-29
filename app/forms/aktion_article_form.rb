class AktionArticleForm
  include ActiveModel::Model
  include AktionArticlePictures
  include AktionArticlePortraitCategories

  validates :title, presence: true
  validates :posted_at, presence: true
  validates :status, presence: true
  validates :status, inclusion: { in: %w(draft published featured archived),
    message: "%{value} is not a valid status for an #{model_name.name.downcase}. Choose between draft, published, featured or archived" }
  with_options if: :is_featured_or_published? do |feat_pub|
    feat_pub.validates :body, presence: {
      in: true,
      message: I18n.t(
        :missing_body_error,
        item_name: model_name.name.downcase,
        published: I18n.t(:published),
        featured: I18n.t(:featured),
        default: "You cannot choose the status \"#{I18n.t(:published)}\" or \"#{I18n.t(:featured)}\" without adding some content to the body of your #{model_name.name.downcase}.")
    }
    feat_pub.validate :has_at_least_one_category_if_featured_or_published
  end

  def submit(params)
    set_attributes(params)
    if valid?
      persist!
      true
    else
      false
    end
  end

  def set_attributes(params)
    self.for_card = params[:for_card]
    self.new_md = params[:new_md]
    self.applicable_existing_categories = params[:applicable_existing_categories]
    self.main_category_id = params[:main_category_id]
    self.new_category_name = params[:new_category_name]
  end

  def persist!
    @main_model.save!
    persist_ancillary_data
  end

  def persist_ancillary_data
    persist_categories(
      @main_model,
      @main_model.class.name,
      applicable_existing_categories,
      main_category_id,
      new_category_name
    )
  end

  def is_featured_or_published?
    ["published", "featured"].include?(status)
  end

  def has_at_least_one_category_if_featured_or_published
    if applicable_existing_categories_all_false && main_category_id.blank? && new_category_name.blank?
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
