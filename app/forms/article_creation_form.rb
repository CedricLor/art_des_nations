class ArticleCreationForm < ArticleForm

  delegate :body, :body=,
  :title, :title=,
  :teaser, :teaser=,
  :posted_from_location, :posted_from_location=,
  :posted_at, :posted_at=,
  :status, :status=,
  :author_id, :author_id=,
  :picturizings,
  :categorizings,
  to: :article

  delegate :full_name, to: :author

  attr_accessor :author_name,
    :md_for_carousel, :for_card, :new_md,
    :applicable_existing_categories, :main_category_id, :new_category_name

  def article
    @main_model ||= Article.new
  end

  def author
    @author ||= @main_model.build_author(full_name: author_name)
  end

  private

  def set_attributes(params)
    super
    self.author_name ||= ''

    self.for_card ||= nil

    self.main_category_id ||= nil
  end

  def persist_ancillary_data
    create_pictures
    super
  end
end
