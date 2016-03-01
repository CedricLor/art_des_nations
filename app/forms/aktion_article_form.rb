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

  validate :does_new_category_chosen_as_main_category_have_a_name

  def submit
  # def submit(params)
    # set_attributes(params)
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def set_attributes(params)
    # self.for_card = params[:for_card]
    self.new_md ||= populate_new_md
    self.applicable_existing_categories ||= populate_applicable_categories
    # self.main_category_id = params[:main_category_id]
    self.new_category_name ||= ''
  end

  def populate_new_md
    new_md_builder = {}
    3.times do |index|
      new_md_builder[index.to_s] = { "title" => "", "for_carousel" => "true" }
    end
    new_md_builder
    # {"0"=>{"title"=>"", "for_carousel"=>"true"}, "1"=>{"title"=>"", "for_carousel"=>"true"}, "2"=>{"title"=>"", "for_carousel"=>"true"}}
  end

  def populate_applicable_categories
    currently_applicable_categories_ids = @main_model.categorizings.map(&:category_id)
    applicable_categories_array = Category.all.map do |c|
      currently_applicable_categories_ids.include?(c.id) ?
      { c.id.to_s => "true" } :
      { c.id.to_s => "false" }
    end
    applicable_categories_array.reduce Hash.new, :merge
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
      errors.add(:missing_categories, I18n.t(
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

  def does_new_category_chosen_as_main_category_have_a_name
    if main_category_id == "new_category" && new_category_name.blank?
      errors.add(:missing_new_category_name, I18n.t(
        :missing_new_category_name_error,
        default: "You cannot choose the new category as the main category if you do not give it a name. Please give a name to your new category or choose another category as main category."
      ))
    end
  end
end
