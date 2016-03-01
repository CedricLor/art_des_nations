class ArticleUpdateForm < ArticleForm
  include AktionArticleFormSetters

  delegate :body, :body=,
  :title, :title=,
  :teaser, :teaser=,
  :posted_from_location, :posted_from_location=,
  :posted_at, :posted_at=,
  :status, :status=,
  :author_id, :author_id=,
  :author,
  :picturizings,
  :categorizings,
  to: :article

  attr_accessor :id, :author_name,
    :md_for_carousel, :for_card, :new_md, :md_to_update, :md_for_destruction,
    :applicable_existing_categories, :main_category_id, :new_category_name

  def article
    @main_model ||= Article.includes(:author).
      includes(picturizings: [:translations, media_container: :translations]).
      includes(categorizings: [category: :translations]).
      find(@id)
  end

  private

  def set_attributes(params)
    super
    set_common_update_attributes
    self.author_name ||= @main_model.author.full_name

  end

  def persist_ancillary_data
    persist_picture_changes
    super
  end
end # End class

